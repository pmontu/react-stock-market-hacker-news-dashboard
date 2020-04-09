import React from "react";
import { useLocation, Link } from "react-router-dom";

export default () => {
  const location = useLocation();
  const getCss = (pathname) => (location.pathname === pathname ? "active" : "");

  return (
    <div className="nav">
      <ul>
        <li className={getCss("/")}>
          <Link to="/">Home</Link>
        </li>
        <li className={getCss("/about")}>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};
