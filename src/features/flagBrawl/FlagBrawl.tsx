import * as React from "react";
import { useState, useEffect } from "react";
import { useStopwatch } from "react-use-precision-timer";
import countries from "../../assets/countries/countries.json";
import {
  generateCorrectAnswerIds,
  generateIncorrectAnswerIdsForId,
  getCountryCode,
} from "../../utils/quizHelpers";
import FlagQuizItem from "./FlagQuizItem";
import { FlagQuestions, Answer } from "../../types/types";
import { addHighscore } from "../../services/highscores";
import Timer from "../../components/Timer";
import QuizResult from "./QuizResult";
import "./FlagBrawl.css";
// import flags from "../../assets/flags";

const preloadFlags = () => {
  const images = [];
  for (const country of countries) {
    const flagImage = `${country.country_code}.svg`;
    const image = new Image();
    image.src = require(`../../assets/flags/${flagImage}`);
    images.push(image);
  }
  return images;
};

function FlagBrawl() {
  const numberOfCountriesInQuiz = 10;
  const numberOfIncorrectChoices = 7;
  const stopwatch = useStopwatch();
  const [quiz, setQuiz] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizResult, setQuizResult] = useState([]);
  const [canSave, setCanSave] = useState(false);
  const [showBetterLuckNextTime, setShowBetterLuckNextTime] = useState(false);

  useEffect(() => {
    // storing a reference to the images
    // eslint-disable-next-line
    const images = preloadFlags();
  }, []);

  const getCountryName = (countryId: string) => {
    const country = countries.find((country) => country.id === countryId);
    return country.name;
  };

  const handleStartNewQuiz = () => {
    stopwatch.start();
    setQuizIndex(0);
    setQuizResult([]);
    const quiz: FlagQuestions[] = [];

    while (quiz.length < numberOfCountriesInQuiz) {
      const correctAnswerId = generateCorrectAnswerIds(countries, quiz);
      const incorrectAnswerIds = generateIncorrectAnswerIdsForId(
        correctAnswerId,
        countries,
        numberOfIncorrectChoices
      );
      quiz.push({
        correctAnswerId,
        incorrectAnswerIds,
      });
    }
    setQuiz(quiz);
    setIsQuizActive(true);
    setCanSave(false);
    setShowBetterLuckNextTime(false);
  };

  const isSelectionCorrect = (guessedId: any) => {
    return quiz[quizIndex].correctAnswerId === guessedId;
  };

  const isQuizFinished = () => {
    return quizIndex === quiz.length - 1;
  };

  const calculateQuizTime = (results: Answer[]) => {
    return results[results.length - 1].duration;
  };

  const handleEndOfQuiz = () => {
    stopwatch.pause();
    setTimeout(() => {
      setIsQuizActive(false);
      const hasIncorrect = quizResult.some((result) => result.status === "INCORRECT");
      setCanSave(!hasIncorrect);
      setShowBetterLuckNextTime(hasIncorrect);
    }, 300000);
  };

  const saveHighScore = () => {
    const profileString = window.localStorage.getItem("profile");
    const profile = JSON.parse(profileString);
    const time = calculateQuizTime(quizResult);
    const name = `${profile.firstname} ${profile.lastname}`;
    addHighscore(name, time);
    setCanSave(false);
  };

  const handleCountryClick = async (event: any) => {
    const guessedId = event.target.getAttribute("data-country-id");
    const status = isSelectionCorrect(guessedId) ? "CORRECT" : "INCORRECT";
    const body: Answer = {
      country_code: getCountryCode(guessedId),
      name: getCountryName(guessedId),
      status,
      duration: stopwatch.getElapsedRunningTime(),
    };
    setQuizResult((preResult: Answer[]) => [...preResult, body]);

    if (isQuizFinished()) {
      handleEndOfQuiz();
    } else {
      // advance the quiz to the next index
      setQuizIndex((quizIndex) => quizIndex + 1);
    }
  };

  return (
    <div className="flagbrawl">
      {countries.length > 0 && !isQuizActive && (
        <div onClick={handleStartNewQuiz} className="icon grid-row-2">
          Start
        </div>
      )}
      {quiz.length > 0 ? <Timer stopwatch={stopwatch} /> : null}
      {isQuizActive ? (
        <FlagQuizItem
          quizItem={quiz[quizIndex]}
          countries={countries}
          handleCountryClick={handleCountryClick}
        />
      ) : null}
      {isQuizActive ? <QuizResult quizResult={quizResult} /> : null}
      {canSave ? (
        <div className="icon" onClick={saveHighScore}>
          Save Highscore
        </div>
      ) : null}
      {showBetterLuckNextTime ? <div>Better Luck next time</div> : null}
    </div>
  );
}

export default FlagBrawl;
