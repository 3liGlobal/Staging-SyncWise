import { classNames } from "../../lib-sync-wise-utils";
import { MouseEventHandler, ReactNode } from "react";

export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  expanded?: boolean;
  extraClasses?: string;
  children?: ReactNode | ReactNode[];
  variant?: "default" | "primary" | "auth" | "outline";
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export function Button({
  variant = "default",
  extraClasses = "",
  disabled = false,
  children,
  onClick,
  type,
}: ButtonProps) {
  function resolveClasses() {
    switch (variant) {
      case "primary":
        return "text-white stroke-white bg-primary-normal border-primary-normal hover:bg-primary-hover hover:border-primary-hover active:bg-primary-normal active:border-primary-normal";
      case "outline":
        return "text-grey-900 stroke-grey-900 bg-transparent border-grey-900 hover:text-white hover:bg-primary-normal hover:border-primary-normal active:bg-primary-normal active:border-primary-normal";
      case "auth":
        return "text-grey-700 stroke-grey-700 bg-white border-grey-700 hover:border-primary-hover hover:text-primary-normal";
      default:
        return "text-white stroke-white bg-primary-normal border-primary-normal hover:bg-primary-hover hover:border-primary-hover active:bg-primary-normal active:border-primary-normal";
    }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        `w-full p-2.5 flex items-center justify-center ${variant === "auth" ? "text-base font-normal" : "text-lg font-semibold"}  rounded-lg border transition-all shadow-sm disabled:bg-grey-200 disabled:text-grey-800 cursor-pointer disabled:cursor-not-allowed disabled:stroke-gray-600 disabled:border-gray-50 disabled:shadow-none`,
        resolveClasses(),
        extraClasses,
      )}
    >
      {children}
    </button>
  );
}
