import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { getMeApi } from "../services/auth";
import { setUser } from "../redux/reducers/authSlice";

const PublicRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getMeApi();
        dispatch(setUser(res.data));
      } catch (err) {
        console.log("error aa rha hai -> ", err);
        dispatch(setUser(null));
      }
    };

    checkAuth();
  }, []);

  if (user) {
    return <Navigate to="/code" />;
  }

  return <Outlet />;
};

export default PublicRoutes;
