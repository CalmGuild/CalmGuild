import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <div className="h-[20vh] bg-backgroundDarker flex centered relative overflow-hidden">
      <div className="flex flex-col absolute left-12 h-[100%] centered">
        <img src="https://i.imgur.com/kbqYzMQ.png" className="h-[80%]" />
      </div>
      <div className="flex flex-col centered child:text-gray-400">
        <h1>
          Guild founded in 2018 by{" "}
          <a href="https://twitter.com/hopez" className="clickableLink">
            hopez
          </a>
        </h1>
        <h1>
          Website designed with ❤️ by{" "}
          <a href="https://github.com/miqhtiedev" className="clickableLink">
            miqhtie
          </a>
        </h1>
        <h1>
          Art by{" "}
          <a href="https://xayman.net/?source=calm" className="clickableLink">
            ayman
          </a>
        </h1>
      </div>
      <div className="flex flex-row space-x-16 absolute right-16">
        <div>
          <h1 className="text-xl text-gray-400">For Staff</h1>
          <Link to="dashboard" className="clickableLink">
            Dashboard
          </Link>
        </div>
        <div className=" flex flex-col centered">
          <h1 className="text-xl text-gray-400">Socials</h1>
          <a className="clickableLink" href="https://plancke.io/hypixel/guild/name/Calm">
            Plancke
          </a>
          <a className="clickableLink" href="https://discord.gg/calm">
            Discord
          </a>
          <a className="clickableLink" href="https://twitter.com/calmguild">
            Twitter
          </a>
          <a className="clickableLink" href="https://hypixel.net/threads/32-calm-%E2%9D%A4%EF%B8%8F-level-165-%E2%99%A1-community-based-%E2%99%A1-easy-reqs-%E2%99%A1-tier-3-discord-1-6k-members.3013892/">
            Forum
          </a>
        </div>
      </div>
    </div>
  );
}
