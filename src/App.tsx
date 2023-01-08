import * as React from 'react';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import "./App.css";
import FlagPage from './features/flagQuiz/FlagPage'
import Header from './components/Header';

import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import HighScores from './features/highScores/HighScores';

function App() {
  const queryClient = new QueryClient()

  return <div className="App">
    <Header />
    <QueryClientProvider client={queryClient}>
      <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/highscores" element={<HighScores />}/>
          <Route path='/flags' element={<FlagPage />} />
      </Routes>
    </QueryClientProvider>
  </div>;
}

export default App;
