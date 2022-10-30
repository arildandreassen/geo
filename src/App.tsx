import * as React from "react";
import "./App.css";
import {getCountry} from './utils/api'

function App() {

  const handleClick = async () => {
    await getCountry()
  }

  return <div className="App">
    <div>
      <button onClick={handleClick}>Save Country</button>
    </div>
  </div>;
}

export default App;
