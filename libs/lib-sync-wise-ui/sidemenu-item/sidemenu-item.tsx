import { MouseEventHandler, ReactNode, ReactElement } from "react";

export type MenuItemProps = {
  text: string;
  icon: ReactElement;
  disabled?: boolean;
  extraClasses?: string;
  children?: ReactNode | ReactNode[];
  variant?: "default" | "active";
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
};

export function SidemenuItem({
  text = "Menu Item",
  icon,
  disabled = false,
  children,
  variant = "default",
  onClick,
}: MenuItemProps) {
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group flex items-center cursor-pointer ${variant !== "active" ? "gap-3" : "gap-5"} menu-item ${disabled ? "cursor-not-allowed opacity-50" : "hover:gap-5 transition-colors duration-200"}  `}
    >
      <span
        className={`menu-icon flex flex-col items-end h-12 w-1/3 rounded-r-full p-3 ${variant === "active" ? "bg-purple-20 text-active-color group-hover:bg-purple-20" : "text-inactive-color"} ${disabled ? "cursor-not-allowed " : "group-hover:bg-grey-300 transition-colors duration-200"} `}
      >
        {icon}
      </span>
      <p
        className={`menu-text ${variant === "active" ? "text-primary-normal ml-3" : ""} font-semibold `}
      >
        {text}
      </p>
      {children}
    </div>
  );
}
