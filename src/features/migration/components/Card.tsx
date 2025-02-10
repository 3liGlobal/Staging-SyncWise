import { MouseEventHandler } from "react";

type PropType = {
  image: string;
  heading: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  description?: string;
  active?: boolean;
};
export default function Card({
  image,
  heading,
  onClick,
  active = true,
  description,
}: PropType) {
  return (
    <div
      className={`flex p-8 bg-purple-50 flex-col gap-4 items-center rounded-xl cursor-pointer ${active ? "" : "opacity-50"}`}
      onClick={onClick}
    >
      <img src={image} alt="module icon" />
      <div className="flex flex-col gap-3">
        <h2 className="flex justify-center items-center text-blue-950 font-semibold text-base lg:text-lg">
          {heading}
        </h2>
        {description && (
          <p className="flex justify-center items-center text-center text-blue-950 font-normal text-sm md:text-sm lg:text-base ">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
