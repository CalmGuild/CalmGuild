import { MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from "@remix-run/react";

import aos from "aos";

import styles from "./styles/generated.css";
import aosStyles from "aos/dist/aos.css";
import { useEffect } from "react";
import NotFound from "./components/NotFound";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: aosStyles },
  ];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Calm Guild",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  useEffect(() => {
    aos.init({ once: true, delay: 50, anchorPlacement: "top-top" });
  }, []);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {caught.status === 404 ? <NotFound /> : ""}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
