import { Outlet } from "react-router-dom";

export default function DataOptimizerLayout() {
  return (
    <div className="h-full p-8 lg:p-10 rounded-2xl bg-white mx-6 sm:mx-12 flex flex-col gap-7">
      <Outlet />
    </div>
  );
}
