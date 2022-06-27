export enum SocialLinkImage {
  DISCORD = "/svg/discord.svg",
  TWITTER = "/svg/twitter.svg",
  GITHUB = "/svg/github.svg",
}

interface SocialLinkProps {
  href: string;
  img: SocialLinkImage;
}

export default function SocialLink({ href, img }: SocialLinkProps) {
  return (
    <a href={href}>
      <img className="h-8 w-8 transition ease-in duration-300 hover:scale-125" src={img} />
    </a>
  );
}
