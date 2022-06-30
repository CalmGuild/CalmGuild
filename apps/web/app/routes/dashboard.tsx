import { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import DashboardSidebar from "~/components/DashboardSidebar";
import requireAuthentication from "~/libs/discord/requireAuthentication";
import { getSession } from "~/libs/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const auth = await requireAuthentication(session);

  return auth.pass ?? auth.fail;
};

export default function Dashboard() {
  const outlet = <Outlet />;

  return (
    <div className="flex flex-row">
      <DashboardSidebar />
      <div className="flex-grow h-screen">{outlet}</div>
    </div>
  );
}
