import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between p-1 border-b border-gray-500 ">
      <div className="flex gap-5">
        <div className="logo">Logo</div>
        <nav>
          <ul className="flex gap-4">
            <li>File</li>
            <li>Edit</li>
            <li>Terminal</li>
            <li>Run</li>
          </ul>
        </nav>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          className="border outline-none px-2 rounded-lg w-100"
        />
      </div>
      <div>Extras</div>
    </div>
  );
};

export default Header;
