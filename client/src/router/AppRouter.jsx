import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
