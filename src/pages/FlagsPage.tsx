import * as React from "react";
import "./Pages.css";
import MenuIcon from "../components/MenuIcon";
const icons = ["brawl", "counter", "practice"];

function FlagsPage() {
  return (
    <div className="wrapper">
      <div className="flagspage">
        {icons.map((icon) => {
          return <MenuIcon name={icon} path={`/flags/brawl`} />;
        })}
      </div>
    </div>
  );
}

export default FlagsPage;
