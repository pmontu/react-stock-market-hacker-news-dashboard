import React from "react";
import { useLocation, Link } from "react-router-dom";
import { MobileView } from "react-device-detect";

export default () => {
  const location = useLocation();
  const getCss = (pathname) => (location.pathname === pathname ? "active" : "");

  return (
    <div className="nav">
      <ul>
        <li className={getCss("/")}>
          <Link to="/">Stocks</Link>
        </li>
        <li className={getCss("/company-list")}>
          <Link to="/company-list">Companies</Link>
        </li>
        <MobileView renderWithFragment>
          <li className={getCss("/news")}>
            <Link to="/news">News</Link>
          </li>
        </MobileView>
        <li className={getCss("/about")}>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};
