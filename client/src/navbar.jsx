import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <header>
      <div className="nav-bar">
        <ul className="lists">
          <li>
            <Link className="lists" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="lists" to="Purchase">
              Buy
            </Link>
          </li>
          <li>
            <Link className="lists" to="Cart">
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
