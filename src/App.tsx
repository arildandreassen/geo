import * as React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import FlagPage from "./features/flagQuiz/FlagPage";
import Header from "./components/Header";

import HomePage from "./pages/HomePage";
import HighScores from "./features/highScores/HighScores";
import Profile from "./features/profile/Profile";
import Footer from "./components/Footer";
function App() {
  return (
    <div id="wrapper">
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/highscores" element={<HighScores />} />
          <Route path="/flags" element={<FlagPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
