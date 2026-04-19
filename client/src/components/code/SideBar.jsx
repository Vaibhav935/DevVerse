import React, { useState } from "react";
import { LuFiles } from "react-icons/lu";
import { CiSearch, CiSettings } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authSlice";
import { logoutApi } from "../../services/auth";

const SideBar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const res = await logoutApi();
    if (res) {
      dispatch(logout());
      navigate("/login");
    }
  };
  return (
    <div className="px-3 py-2 flex flex-col justify-between border-r h-full border-[#2A2B2C]">
      <div className="flex flex-col gap-5 items-center">
        <div className="flex items-center justify-center cursor-pointer">
          <LuFiles size={20} />
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          <CiSearch size={20} />
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center">
        <div className="flex items-center justify-center cursor-pointer">
          <FaRegUserCircle size={20} />
        </div>
        <div
          onClick={() => setSettingsOpen((prev) => !prev)}
          className="flex items-center justify-center cursor-pointer relative "
        >
          <div>
            <CiSettings size={20} />
          </div>
          {settingsOpen && (
            <div className="absolute bottom-0 left-7 bg-[#1E1E1E] p-2 rounded h-20 w-50 flex flex-col gap-2">
              <h1 className="border-b border-[#2A2B2C] text-sm">Settings</h1>
              <div>
                {" "}
                <button
                  onClick={handleLogout}
                  className="px-2 rounded-lg bg-red-500 cursor-pointer w-full py-1   "
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
