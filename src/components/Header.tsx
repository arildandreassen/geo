import * as React from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="header-container">
      <div className="header-items logo grid-item-2" onClick={handleLogoClick}>
        <span>GEOBRAWL.COM</span>
      </div>
      <div className="header-items grid-item-4">
        <Link to="/" className="standard-link">
          Home
        </Link>
      </div>
      <div className="header-items grid-item-5">
        <Link to="/flags" className="standard-link">
          Flags
        </Link>
      </div>
      <div className="header-items grid-item-6">
        <Link to="/highscores" className="standard-link">
          High Scores
        </Link>
      </div>
      <div className="header-items grid-item-7">
        <Link to="/profile" className="standard-link">
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Header;
