import { LoaderFunction, redirect } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import loginUser from "~/libs/loginUser";

export const loader: LoaderFunction = async ({ request }) => {
  const code = new URL(request.url).searchParams.get("code");

  if (!code) {
    throw new Response("No code in URL params", { status: 400 });
  }

  return loginUser(code)
    .then((sessionCookie) => {
      return redirect("/dashboard", {
        headers: {
          "Set-Cookie": sessionCookie,
        },
      });
    })
    .catch((err) => {
      throw err;
    });
};

export function CatchBoundary() {
  const caught = useCatch();
  switch (caught.status) {
    case 400: {
      return <h1>Invalid code in URL params</h1>;
    }

    case 401: {
      return <h1>Your oauth code is invalid</h1>;
    }

    case 500: {
      return (
        <div>
          <h1>Sorry, something went wrong on our end</h1>
          <h2>Please try again later</h2>
        </div>
      );
    }

    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}
