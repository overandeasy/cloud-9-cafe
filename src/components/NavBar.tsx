import { NavLink } from "react-router";
import UserCard from "./UserCard";
import { UserAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";

function NavBar() {
  const { user } = UserAuth() || {};

  return (
    <nav className="bg-card border-b border-border shadow-sm rounded-xl mt-2 mb-4 px-6 py-3 flex items-center justify-between gap-2 ">
      <div className="flex items-center gap-2 sm:gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors font-medium ${
              isActive
                ? "bg-cafe-theme text-white shadow"
                : "text-foreground hover:bg-muted"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors font-medium ${
              isActive
                ? "bg-cafe-theme text-white shadow"
                : "text-foreground hover:bg-muted"
            }`
          }
        >
          About
        </NavLink>
        {user && (
          <NavLink
            to="/my-coffees"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition-colors font-medium ${
                isActive
                  ? "bg-cafe-theme text-white shadow"
                  : "text-foreground hover:bg-muted"
              }`
            }
          >
            My Coffees
          </NavLink>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-6">
        <UserCard />
        {!user && (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
