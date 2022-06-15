import database from "../database.server";
import { commitSession } from "../session.server";
import refreshAccessToken from "./refreshAccessToken";
import getDiscordUser, { DiscordUser } from "./getDiscordUser";
import { Session, redirect } from "@remix-run/node";
import getOauthUrl from "./getOauthUrl";
import invariant from "tiny-invariant";

type RequireAuthenticationResponse = { pass: DiscordUser; fail?: undefined } | { fail: Response; pass?: undefined };

export default async function requireAuthentication(session: Session): Promise<RequireAuthenticationResponse> {
  return new Promise(async (resolve) => {
    invariant(process.env.CLIENT_ID, "CLIENT_ID env variable not defined");
    invariant(process.env.SITE_NAME, "SITE_NAME env variable not defined");

    const oauthRedirect = getOauthUrl(process.env.CLIENT_ID, process.env.SITE_NAME);

    const discordId = session.get("discordId");
    if (!discordId) {
      resolve({ fail: redirect(oauthRedirect) });
      return;
    }

    let user = await database.user.findUnique({ where: { discordId: discordId } });
    if (!user || !user.accessToken || !user.refreshToken || !user.tokenExpires) {
      session.unset("discordId");
      resolve({ fail: redirect(oauthRedirect, { headers: { "Set-Cookie": await commitSession(session) } }) });
      return;
    }

    if (Date.now() > user.tokenExpires) {
      const newToken = await refreshAccessToken(user.refreshToken).catch(async () => {
        session.unset("discordId");
        resolve({ fail: redirect(oauthRedirect, { headers: { "Set-Cookie": await commitSession(session) } }) });
      });

      if (!newToken) return;

      user = await database.user.update({
        data: {
          accessToken: newToken.access_token,
          refreshToken: newToken.refresh_token,
          tokenExpires: newToken.expires,
        },
        where: {
          discordId: user.discordId,
        },
      });
    }

    if (!user.accessToken) return;

    getDiscordUser(user.accessToken)
      .then((user) => {
        resolve({ pass: user });
      })
      .catch(async () => {
        session.unset("discordId");
        resolve({ fail: redirect(oauthRedirect, { headers: { "Set-Cookie": await commitSession(session) } }) });
      });
  });
}
