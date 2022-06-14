import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import getOauthUrl from "~/libs/discord/getOauthUrl";
import { getSession } from "~/libs/session.server";

interface LoaderData {
  oauthUrl: string;
  isAuthenticated: boolean;
}

export const loader: LoaderFunction = async ({ request }) => {
  invariant(process.env.CLIENT_ID, "CLIENT_ID env variable not defined");
  invariant(process.env.SITE_NAME, "SITE_NAME env variable not defined");

  const session = await getSession(request);

  return {
    oauthUrl: getOauthUrl(process.env.CLIENT_ID, process.env.SITE_NAME),
    isAuthenticated: session.get("discordId") ? true : false,
  };
};

export default function Index() {
  const { oauthUrl, isAuthenticated } = useLoaderData<LoaderData>();

  function handleClick() {
    if (isAuthenticated) {
      window.location.href = "/dashboard";
      return;
    }

    window.location.href = oauthUrl;
  }

  return (
    <div>
      <h1>
        <span className="line-through">Clam</span> Calm guild
      </h1>
      <button type="submit" onClick={handleClick}>
        {isAuthenticated ? "Dashboard" : "Login"}
      </button>
    </div>
  );
}
