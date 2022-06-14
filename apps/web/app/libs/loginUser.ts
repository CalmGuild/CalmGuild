import database from "./database.server";
import getAccessToken from "./discord/getAccessToken";
import getDiscordUser from "./discord/getDiscordUser";
import { createUserSession } from "./session.server";

export default async function (code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    getAccessToken(code)
      .then((token) => {
        getDiscordUser(token.access_token)
          .then(async (user) => {
            database.user
              .upsert({
                create: {
                  discordId: user.id,
                  accessToken: token.access_token,
                  username: user.username,
                  discriminator: user.discriminator,
                  refreshToken: token.refresh_token,
                  tokenExpires: token.expires,
                },
                update: {
                  accessToken: token.access_token,
                  username: user.username,
                  discriminator: user.discriminator,
                  refreshToken: token.refresh_token,
                  tokenExpires: token.expires,
                },
                where: {
                  discordId: user.id,
                },
              })
              .then(async () => {
                resolve(await createUserSession(user.id));
              })
              .catch((err) => {
                console.error(err);
                reject(new Response("Error updating database", { status: 500 }));
              });
          })
          .catch((err) => {
            console.error(err);
            reject(new Response("Invalid authorization code", { status: 500 }));
          });
      })
      .catch(() => {
        reject(new Response("Invalid oauth code", { status: 401 }));
      });
  });
}
