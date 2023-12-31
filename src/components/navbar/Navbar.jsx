import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <div className="navbar">
    <div className="navbar-container">
      <div className="navbar-heading">
        <h1>
          <NavLink to="/" className="nav-title">
            MustSee
          </NavLink>
        </h1>
      </div>
    </div>
  </div>
);

export default Navbar;
