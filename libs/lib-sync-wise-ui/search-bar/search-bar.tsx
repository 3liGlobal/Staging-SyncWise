import { ChangeEvent } from "react";
import searchIcon from "../../../src/assets/images/search-icon.svg";

interface SearchBarProps {
  id: string;
  placeholder?: string;
  expanded?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({
  id,
  expanded = true,
  ...otherProps
}: SearchBarProps) {
  return (
    <div
      className={`flex gap-3 ${expanded ? "w-full" : "w-fit"} rounded-md border
     border-grey-100 p-3 shadow-sm placeholder:text-gray-400 p-md outline-none bg-white`}
    >
      <img
        src={searchIcon}
        alt="search-icon"
        className="w-5 h-5 fill-gray-400"
      />
      <input
        id={id}
        {...otherProps}
        className="outline-none border-none w-full"
      />
    </div>
  );
}
