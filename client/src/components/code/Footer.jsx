import React from "react";
import { logoutApi } from "../../services/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authSlice";

const Footer = () => {
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
    <div className="p-1 border-t border-gray-500">
      <button
        onClick={handleLogout}
        className="px-2 rounded-lg bg-red-400 cursor-pointer "
      >
        Logout
      </button>
    </div>
  );
};

export default Footer;
