import * as React from "react";
import "./Pages.css";

import MenuIcon from "../components/MenuIcon";
const icons = ["flags", "borders", "cities", "last", "five"];

function HomePage() {
  return (
    <div className="wrapper">
      <div className="homepage">
        {icons.map((icon) => {
          return <MenuIcon name={icon} path={"/flags"} key={icon} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;
