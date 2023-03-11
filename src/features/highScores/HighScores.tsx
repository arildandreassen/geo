import * as React from "react";
import { useState, useEffect } from "react";
import { listHighscores } from "../../services/highscores";
import { formatDuration } from "../../utils/quizHelpers";
import "./HighScores.css";

function HighScores() {
  const [highscores, setHighScores] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    listHighscores(signal).then((response) => {
      setHighScores(response.highscores);
    });

    return () => controller.abort();
  }, []);

  return (
    <div className="highscores">
      <div className="title">High Scores</div>
      <div className="highscore-container header">
        <div className="grid-item-2">Rank #</div>
        <div className="grid-item-3">Name</div>
        <div className="grid-item-4">Time</div>
      </div>

      {highscores.length > 0 ? (
        highscores.map(({ name, score }, index) => {
          return (
            <div className="highscore-container" key={name + score}>
              <div className="grid-item-2">{index + 1}</div>
              <div className="grid-item-3 score-item">{name}</div>
              <div className="grid-item-4 score-item">{formatDuration(score)}</div>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default HighScores;
