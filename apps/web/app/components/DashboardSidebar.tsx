import { Link } from "@remix-run/react";
import DashboardButton, { ButtonType } from "./DashboardButton";

export default function DashboardSidebar() {
  const buttons = Object.values(ButtonType).map((type) => <DashboardButton type={type} key={type.to} />);

  return (
    <div className="h-screen w-72 bg-backgroundDarker">
      <div className="items-center flex flex-col">
        <Link to="/" className="w-[60%]">
          <img src="https://i.imgur.com/kbqYzMQ.png" className="aspect-square" />
        </Link>
        <div className="w-[80%] h-1 bg-gray-400 relative bottom-5" />
      </div>
      <div className="space-y-2 ml-4 flex flex-col">{...buttons}</div>
      <div className="absolute bottom-5 w-[272px] ml-4">
        <DashboardButton type={"LOGOUT"} />
      </div>
    </div>
  );
}
