import { HomeIcon, LogoutIcon, QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { Form, Link, useLocation } from "@remix-run/react";

export const ButtonType = {
  HOME: { label: "Overview", icon: <HomeIcon />, to: "/dashboard" },
};

type ButtonType = typeof ButtonType[keyof typeof ButtonType];

interface DashboardButtonProps {
  type: ButtonType | "LOGOUT";
}

export default function DashboardButton({ type }: DashboardButtonProps) {
  const location = useLocation();

  if (type !== "LOGOUT") {
    const active = location.pathname.toLowerCase() === type.to || location.pathname.toLowerCase() === type.to + "/";
    return (
      <Link to={type.to} className={"flex flex-row space-x-5 items-center font-secondary h-12 transition-all w-[90%]" + (active ? " bg-[#282828] rounded-md" : " hover:bg-[#282828] hover:rounded-md")}>
        <div className={"w-8 h-8 text-gray-400 transition ease-linear duration-200 ml-3" + (active ? " text-white" : "")}>{type.icon}</div>
        <p className={"text-xl transition ease-linear duration-200" + (active ? " text-gray-200" : " text-gray-400")}>{type.label}</p>
      </Link>
    );
  } else
    return (
      <Form method="post" action="/api/logout" className="w-[90%] h-12 rounded-md hover:bg-[#282828] flex items-center">
        <button type="submit" className="flex flex-row space-x-5 w-full">
          <LogoutIcon className="w-8 h-8 text-gray-400 ml-3" />
          <p className="text-xl text-gray-400">Logout</p>
        </button>
      </Form>
    );
}
