import * as React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import FlagBrawl from "./features/flagBrawl/FlagBrawl";
import FlagsPage from "./pages/FlagsPage";
import Header from "./components/Header";

import HomePage from "./pages/HomePage";
import HighScores from "./features/highScores/HighScores";
import Profile from "./features/profile/Profile";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <Header />
      <section className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/highscores" element={<HighScores />} />
          <Route path="/flags" element={<FlagsPage />} />
          <Route path="/flags/brawl" element={<FlagBrawl />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default App;
