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
  const numberOfIncorrectChoices = 1;
  const stopwatch = useStopwatch();
  const [quiz, setQuiz] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [showFlagQuiz, setShowFlagQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState([]);
  const [canSave, setCanSave] = useState(true);

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
    setShowFlagQuiz(true);
    setShowResult(true);
    setCanSave(true);
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
    setIsQuizActive(false);
    setShowFlagQuiz(false);
  };

  const saveHighScore = () => {
    setCanSave(false);
    const profileString = window.localStorage.getItem("profile");
    const profile = JSON.parse(profileString);
    const time = calculateQuizTime(quizResult);
    const displayName = `${profile.displayName}`;
    addHighscore(displayName, time);
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
      {quiz.length > 0 ? <Timer stopwatch={stopwatch} /> : null}
      {!isQuizActive && (
        <div className="grid-row-2">
          {
            <div onClick={handleStartNewQuiz} className="icon">
              Start
            </div>
          }
          {canSave === true &&
          quizResult.length === numberOfCountriesInQuiz &&
          !quizResult.some((result) => result.status === "INCORRECT") ? (
            <div className="icon" onClick={saveHighScore}>
              Save Highscore
            </div>
          ) : null}
        </div>
      )}
      {showFlagQuiz ? (
        <FlagQuizItem
          quizItem={quiz[quizIndex]}
          countries={countries}
          handleCountryClick={handleCountryClick}
        />
      ) : null}
      {showResult ? <QuizResult quizResult={quizResult} /> : null}
    </div>
  );
}

export default FlagBrawl;
