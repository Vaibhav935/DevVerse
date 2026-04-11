import React from "react";
import { FaFileCirclePlus, FaFolderPlus } from "react-icons/fa6";

const SideBarExpansion = () => {
  return (
    <div className="w-70 border-r border-gray-500 p-1">
      <h1 className="text-sm mb-2 font-semibold">Explorer</h1>
      <div className="flex justify-between">
        <h1 className="text-sm">folder name</h1>
        <div className="flex gap-4">
          <div className="cursor-pointer flex items-center justify-center">
            <FaFileCirclePlus size={16} />
          </div>
          <div className="cursor-pointer flex items-center justify-center">
            <FaFolderPlus size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarExpansion;
