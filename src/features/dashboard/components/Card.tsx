import { ReactNode } from "react";
import { classNames } from "../../../../libs/lib-sync-wise-utils";

type CardProps = {
  children: ReactNode;
  extraClasses?: string;
};

export default function Card({ extraClasses, children }: CardProps) {
  return (
    <div
      className={classNames(
        `bg-white flex-grow shadow-dashboard-widget rounded-2xl py-6 px-4 3xl:px-10`,
        extraClasses,
      )}
    >
      {children}
    </div>
  );
}
