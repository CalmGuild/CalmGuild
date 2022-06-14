import { LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import requireAuthentication from "~/libs/discord/requireAuthentication";
import { destroySession, getSession } from "~/libs/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const auth = await requireAuthentication(session);

  return auth.pass ?? auth.fail;
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request);
  return redirect("/", { headers: { "Set-Cookie": await destroySession(session) } });
};

export default function Dashboard() {
  const user = useLoaderData();

  return (
    <div>
      <h1>
        Hello, {user.username}#{user.discriminator}
      </h1>
      <Form method="post">
        <button type="submit">Logout</button>
      </Form>
    </div>
  );
}
