import { UserAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = UserAuth() || {};
  const location = useLocation();

  if (!user) {
    // Save the path they tried to access
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  } else return children;
}
