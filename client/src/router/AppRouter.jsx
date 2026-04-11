import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import CodeLayout from "../layout/CodeLayout";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      element: <PrivateRoutes />,
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/code",
          element: <CodeLayout />,
        },
      ],
    },

    {
      element: <PublicRoutes />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
