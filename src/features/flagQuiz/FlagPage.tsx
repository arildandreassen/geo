import * as React from 'react'
import {useState} from 'react';
import {
    useQuery,
} from '@tanstack/react-query'
import {listCountries} from '../../services/countries'
import {generateCorrectAnswerIds, generateIncorrectAnswerIdsForId} from '../../utils/quizHelpers'
import FlagQuizItem from './FlagQuizItem';
import {Country, FlagQuestions} from '../../types/types'
import {addHighscore} from '../../services/highscores'

function FlagPage() {
    const quizLength = 2;
    const numberOfIncorrectChoices = 6
    const penaltyForWrongAnswer = 50000


    const [quiz, setQuiz] = useState([])
    const [quizIndex, setQuizIndex] = useState(0)
    const [thinkingTimer, setThinkingTimer] = useState(null)
    const [timer, setTimer] = useState(null)
    const {data, isLoading} = useQuery(
        ['countries'],
        listCountries
    )

    const createNewQuiz = () => {
        const countries: Country[] = data.countries
        const quiz: FlagQuestions[] = []

        while(quiz.length < quizLength){
            const correctAnswerId = generateCorrectAnswerIds(countries)
            const incorrectAnswerIds = generateIncorrectAnswerIdsForId(correctAnswerId, countries, numberOfIncorrectChoices)
            quiz.push({
                correctAnswerId,
                incorrectAnswerIds
            })
        }
        setTimer(null)
        setQuiz(quiz)
        const now = new Date().getTime()
        setThinkingTimer(now)
    }

    const handleEndOfQuiz = () => {
        setQuiz([])
        setQuizIndex(0)
        addHighscore('Arild', timer)

    }

    const handleCountryClick = (event: any) => {
        const guessedId = event.target.getAttribute('data-country-id')
        const now = new Date().getTime()
        if(quiz[quizIndex].correctAnswerId === Number(guessedId)){
            const duration = now - thinkingTimer
            setTimer((timer: any) => {
                return timer + duration
            })
            setThinkingTimer(now)
        } else {
            setTimer((timer: any) => {
                return timer + penaltyForWrongAnswer
            })
        }
        if(quizIndex < quiz.length -1){
            const nextIndex = quizIndex + 1
            setQuizIndex(nextIndex)
        } else {
            handleEndOfQuiz()
        }
    }

    return  <div>
                <div>
                    {!isLoading && !quiz.length && <button onClick={createNewQuiz}>New Flag Quiz</button>}
                </div>
                {quiz.length > 0 && <FlagQuizItem quizItem={quiz[quizIndex]} handleCountryClick={handleCountryClick}/>}
            </div>
}

export default FlagPage