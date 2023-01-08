import * as React from 'react'
import {useState, useEffect, useRef} from 'react';
import {listCountries} from '../../services/countries'
import {generateCorrectAnswerIds, generateIncorrectAnswerIdsForId} from '../../utils/quizHelpers'
import FlagQuizItem from './FlagQuizItem';
import {FlagQuestions} from '../../types/types'
import {addHighscore} from '../../services/highscores'
import Timer from '../../components/Timer';

function FlagPage() {
    const quizLength = 10;
    const numberOfIncorrectChoices = 6
    const penaltyForWrongAnswer = 50000 //milliseconds

    const totalQuizTime = useRef(0)
    let flagTimer = new Date().getTime()

    const [quiz, setQuiz] = useState([])
    const [quizIndex, setQuizIndex] = useState(0)
    const [countries, setCountries] = useState([])

    useEffect(() => {
        listCountries().then(response => {
            setCountries(response.countries)
        })
        totalQuizTime.current = 0
    }, [])

    const createNewQuiz = () => {
        const quiz: FlagQuestions[] = []

        while(quiz.length < quizLength){
            const correctAnswerId = generateCorrectAnswerIds(countries)
            const incorrectAnswerIds = generateIncorrectAnswerIdsForId(correctAnswerId, countries, numberOfIncorrectChoices)
            quiz.push({
                correctAnswerId,
                incorrectAnswerIds
            })
        }
        setQuiz(quiz)
        totalQuizTime.current = 0
        flagTimer = new Date().getTime()

    }

    const handleEndOfQuiz = () => {
        const profileString = window.localStorage.getItem('profile')
        const profile = JSON.parse(profileString)
        addHighscore(profile.name, totalQuizTime.current)
        setQuiz([])
        setQuizIndex(0)

    }

    const handleCountryClick = async (event: any) => {
        const guessedId = event.target.getAttribute('data-country-id')

        const now = new Date().getTime()
        if(quiz[quizIndex].correctAnswerId === Number(guessedId)){
            const duration = now - flagTimer
            totalQuizTime.current += duration
            flagTimer = new Date().getTime()
        } else {
            totalQuizTime.current += penaltyForWrongAnswer
        }
        if(quizIndex < quiz.length -1){
            const nextIndex = quizIndex + 1
            setQuizIndex(nextIndex)
        } else {
            handleEndOfQuiz()
        }
    }

    return  (
        <div>
            <div>
                {countries.length > 0 && !quiz.length && <button onClick={createNewQuiz}>New Flag Quiz</button>}
            </div>
            <div>
            {quiz.length > 0 && <Timer />}
            </div>
            {quiz.length > 0 && <FlagQuizItem quizItem={quiz[quizIndex]} countries={countries} handleCountryClick={handleCountryClick}/>}
            {totalQuizTime.current}
        </div>
    )
}

export default FlagPage