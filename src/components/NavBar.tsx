import { NavLink } from "react-router";
import UserCard from "../pages/private/UserCard";
import { UserAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";

function NavBar() {
  const { user } = UserAuth() || {};

  return (
    <nav className="flex bg-cafe-theme/80 rounded-md justify-between items-center p-2">
      <div className="space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) => `${isActive ? "text-background" : ""}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `${isActive ? "text-background" : ""}`}
        >
          About
        </NavLink>
      </div>

      <div className="flex space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <NavLink
              to="/my-coffees"
              className={({ isActive }) =>
                `${isActive ? "text-background" : ""}`
              }
            >
              My Coffees
            </NavLink>
            <UserCard />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <UserCard />
            <Button asChild size="sm">
              <NavLink
                to="/sign-up"
                className={({ isActive }) =>
                  `${isActive ? "text-background" : ""}`
                }
              >
                Sign Up
              </NavLink>
            </Button>
            <Button asChild size="sm">
              <NavLink
                to="/sign-in"
                className={({ isActive }) =>
                  `${isActive ? "text-background" : ""}`
                }
              >
                Sign In
              </NavLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
