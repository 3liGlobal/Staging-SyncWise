import { Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import logoWoText from "../../assets/images/logo-wo-text.svg";
import illustration from "../../assets/images/auth/illustration.svg";
export default function AuthLayout() {
  return (
    <div className="flex justify-center items-center h-screen lg:bg-grey-100">
      <div className=" w-1/2  h-full pl-12 hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-y-14 ">
        <div className=" flex flex-col justify-center items-center gap-y-4 ">
          <img src={logo} alt="syncwise" className="w-40 h-40" />
          <p className="max-w-md text-center text-lg font-light">
            Lorem ipsum dolor sit amet consectetur. Nunc fringilla feugiat
            aliquam sed. Gravida libero nunc semper sagittis enim sodales
            bibendum tellus.
          </p>
        </div>
        <div>
          <img
            src={illustration}
            alt="syncwise"
            className="h-96 object-cover "
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center lg:w-1/2 lg:bg-white lg:h-full rounded-[55px] lg:rounded-r-none lg:rounded-l-[55px]  w-full sm:w-[600px] p-8 sm:shadow-md lg:shadow-none">
        <img src={logoWoText} alt="syncwise" className="w-30 h-30 lg:hidden" />
        <Outlet />
      </div>
    </div>
  );
}
