import React from "react";
// library
import { Link, useLocation } from "react-router-dom";
// image
import Logo from "../assets/image/46-facebook-512.webp";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/posts">Şəxsi kabinet</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
