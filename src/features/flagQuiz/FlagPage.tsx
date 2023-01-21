import * as React from 'react'
import {useState, useEffect, useRef} from 'react';
import { useStopwatch  } from "react-use-precision-timer";
import {listCountries} from '../../services/countries'
import {generateCorrectAnswerIds, generateIncorrectAnswerIdsForId} from '../../utils/quizHelpers'
import FlagQuizItem from './FlagQuizItem';
import {FlagQuestions} from '../../types/types'
import {addHighscore} from '../../services/highscores'
import Timer from '../../components/Timer';
import QuizResult from './QuizResult'

type answer = {
    name: string
    status: string
    duration:  number
}

function FlagPage() {
    const numberOfCountriesInQuiz = 3;
    const numberOfIncorrectChoices = 2
    const stopwatch = useStopwatch();
    const [quiz, setQuiz] = useState([])
    const [quizIndex, setQuizIndex] = useState(0)
    const [countries, setCountries] = useState([])
    const [isQuizActive, setIsQuizActive] = useState(false)
    const [quizResult, setQuizResult] = useState([])


    useEffect(() => {
        listCountries().then(response => {
            setCountries(response.countries)
        })
    }, [quizResult])

    const getCountryName = (countryId: number) => {
        const country = countries.find(country => country.id === countryId)
        return country.name
    }

    const handleStartNewQuiz = () => {
        stopwatch.start()
        setQuiz([])
        setQuizIndex(0)
        setQuizResult([])
        const quiz: FlagQuestions[] = []

        while(quiz.length < numberOfCountriesInQuiz){
            const correctAnswerId = generateCorrectAnswerIds(countries)
            const incorrectAnswerIds = generateIncorrectAnswerIdsForId(correctAnswerId, countries, numberOfIncorrectChoices)
            quiz.push({
                correctAnswerId,
                incorrectAnswerIds
            })
        }
        setQuiz(quiz)
        setIsQuizActive(true)
    }

    const isSelectionCorrect = (guessedId: any) => {
        return quiz[quizIndex].correctAnswerId === Number(guessedId)
    }

    const isQuizFinished = () => {
        return quizIndex === quiz.length -1
    }

    const calculateQuizTime = (result: answer [] ) => {
        return 5
    }

    const handleEndOfQuiz = () => {
        stopwatch.pause()
        setIsQuizActive(false)
    }

    const saveHighScore = () => {
        const profileString = window.localStorage.getItem('profile')
        const profile = JSON.parse(profileString)
        const time = calculateQuizTime(quizResult)
    }

    const handleCountryClick = async (event: any) => {
        const guessedId = event.target.getAttribute('data-country-id')
        const status = isSelectionCorrect(guessedId) ? 'correct' : 'incorrect';
        const body: answer = {
            name: getCountryName(guessedId),
            status,
            duration: stopwatch.getElapsedRunningTime(),
        }
        setQuizResult((preResult: answer []) => ([...preResult, body]))


        if(isQuizFinished()){
            handleEndOfQuiz()
        } else {
            // advance the quiz to the next index
            setQuizIndex(quizIndex => quizIndex + 1)
        }
    }

    return  (
        <div>
            <div>FLAG QUIZ</div>
            <div>
                {!countries.length && <div>Please wait. Creating Quiz...</div>}
                {countries.length > 0 && !isQuizActive && <button onClick={handleStartNewQuiz}>Start Quiz</button>}
            </div>
                <Timer stopwatch={stopwatch}/>
            <div>
                {isQuizActive ? <FlagQuizItem quizItem={quiz[quizIndex]} countries={countries} handleCountryClick={handleCountryClick}/>: null}
            </div>
            <QuizResult quizResult={quizResult}/>
        </div>
    )
}

export default FlagPage