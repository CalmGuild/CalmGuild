import Footer from "~/components/Footer";
import ImageButton from "~/components/ImageButton";
import SocialLink, { SocialLinkImage } from "~/components/SocialLink";

export default function Index() {
  return (
    <div>
      <div className="flex flex-col centered h-[85vh]">
        <div className="flex flex-col relative bottom-[5vh]">
          <h1 className="text-6xl font-display text-display font-bold">Calm Guild</h1>
          <div className="w-[90%] ml-[5%] h-[2px] bg-gray-400 relative top-8" />
          <div className="flex space-x-8 centered relative top-16">
            <SocialLink href="https://github.com/calmguild" img={SocialLinkImage.GITHUB} />
            <SocialLink href="https://twitter.com/calmguild" img={SocialLinkImage.TWITTER} />
            <SocialLink href="https://discord.gg/calm" img={SocialLinkImage.DISCORD} />
          </div>
        </div>
      </div>
      <div className="bg-backgroundDark h-[47vh] flex flex-col items-center">
        <h1 className="text-4xl font-display mt-12">Why us?</h1>
        <div className="flex flex-col space-y-28 relative top-[15%] centered">
          <h1 className="text-3xl text-slate-200 font-secondary" data-aos="fade">
            Top #50 hypixel guilds
          </h1>
          <h1 className="text-3xl text-slate-200 font-secondary" data-aos="fade">
            Great staff team
          </h1>
          <h1 className="text-3xl text-slate-200 font-secondary" data-aos="fade">
            Active Discord
          </h1>
        </div>
      </div>
      <div className="bg-background h-[40vh] flex centered">
        <div className="flex flex-col centered space-y-4">
          <h1 className="text-3xl text-slate-200 font-secondary">What are you waiting for? Apply in our discord.</h1>
          <ImageButton label="Join discord" href="https://discord.gg/calm" img="/svg/discord.svg" height="50px" width="200px" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
