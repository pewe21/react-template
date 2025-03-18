import { createBrowserRouter, RouteObject } from "react-router-dom";
import Login from "@/page/login";
import Dashboard from "@/page/dashboard";
import ProtectedRoute from "./Protected";
import { masterRouter } from "./master-route";
import Profile from "@/page/profile";
import LoginV2 from "@/page/login/LoginV2";

const protectedRouter: RouteObject[] = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },

  ...masterRouter,
];

const globalRouter: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/v2/login",
    element: <LoginV2 />,
  },

  {
    path: "/coba",
    element: <div>Coba</div>,
  },
];

const router = createBrowserRouter([...globalRouter, ...protectedRouter]);

export { router };
