import React from "react";
import { NavLink } from "react-router";
import UserCard from "../pages/private/UserCard";

function NavBar() {
  return (
    <nav className="flex justify-between items-center p-4">
      <div className="space-x-2">
        <NavLink
          to="/"
          className={({ isActive }) => `${isActive ? "active" : ""}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `${isActive ? "active" : ""}`}
        >
          About
        </NavLink>
      </div>
      <div className="justify-end space-x-2">
        <UserCard />
      </div>
    </nav>
  );
}

export default NavBar;
