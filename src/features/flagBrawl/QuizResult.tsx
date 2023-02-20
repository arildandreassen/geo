import * as React from "react";
import "./QuizResult.css";
import { formatDuration } from "../../utils/quizHelpers";

function QuizResult({ quizResult }: any) {
  const fileExtension = "svg";

  return (
    <div className="quizresult">
      {quizResult.map((result: any) => {
        const { country_code, name, status, duration } = result;
        // eslint-disable-next-line
        const flag = require(`../../assets/flags/${country_code}.${fileExtension}`);
        return (
          <div className="quizresult-container" key={`${name}_${status}`}>
            <div className="grid-item-2 justify-end">
              <img src={`${flag}`} style={{ height: "10px", border: "1px solid black" }} />
            </div>
            <div className="grid-item-3 justify-start">{name}</div>
            <div className={`grid-item-4 ${status}`}>{status}</div>
            <div className="grid-item-5">{formatDuration(duration)}</div>
          </div>
        );
      })}
    </div>
  );
}

export default QuizResult;
