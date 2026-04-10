import React from "react";
import { RxCross2 } from "react-icons/rx";

const Terminal = () => {
  return (
    <div className=" border-t border-gray-500 h-50">
      <div className="p-1 flex justify-between border-b border-gray-500">
        <h1>Terminal</h1>
        <div className="flex items-center justify-center cursor-pointer">
          <RxCross2 />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
