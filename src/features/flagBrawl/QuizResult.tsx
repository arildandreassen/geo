import * as React from "react";
import "./QuizResult.css";
import { formatDuration } from "../../utils/quizHelpers";

function QuizResult({ quizResult }: any) {
  const fileExtension = "svg";

  return (
    <div className="quizresult">
      <div className="result-header">Result</div>
      {quizResult.map((result: any) => {
        const { country_code, name, status, duration } = result;
        return (
          <div className="quizresult-container" key={`${name}_${status}`}>
            <div className="grid-item-1 justify-end image">
              <img
                src={require(`../../assets/flags/${country_code}.${fileExtension}`)}
                style={{ height: "20px", border: "1px solid black" }}
              />
            </div>
            <div className="grid-item-2 justify-start country-name-wrapper">{name}</div>
            <div className={`grid-item-3 ${status.toLowerCase()}`}>{status}</div>
            <div className="grid-item-4 time">{formatDuration(duration)}</div>
          </div>
        );
      })}
    </div>
  );
}

export default QuizResult;
