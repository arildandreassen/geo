import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./MenuIcon.css";

function MenuIcon({ name, path }: any) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div className="icon" data-name={name} onClick={handleClick}>
      {name}
    </div>
  );
}

export default MenuIcon;
