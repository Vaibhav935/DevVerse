import React from "react";
import { LuFiles } from "react-icons/lu";
import { CiSearch, CiSettings } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className="px-1 py-2 flex flex-col gap-5 border-r h-full border-gray-500">
      <div className="flex items-center justify-center cursor-pointer">
        <LuFiles size={20} />
      </div>
      <div className="flex items-center justify-center cursor-pointer">
        <CiSearch size={20} />
      </div>
      <div className="flex items-center justify-center cursor-pointer">
        <FaRegUserCircle size={20} />
      </div>
      <div className="flex items-center justify-center cursor-pointer">
        <CiSettings size={20} />
      </div>
    </div>
  );
};

export default SideBar;
