interface ImageButtonProps {
  label: string;
  href: string;
  img: string;
  height: string;
  width: string;
}

export default function ImageButton({ href, img, height, width, label }: ImageButtonProps) {
  const style = {
    width: width,
    height: height,
  };

  return (
    <div>
      <a href={href} style={style} className="flex flex-row space-x-6 bg-indigo-600 hover:bg-indigo-500 transition ease-in centered rounded-md">
        <img src={img} className="h-[60%] aspect-square" />
        <h1 className="text-lg">{label}</h1>
      </a>
    </div>
  );
}
