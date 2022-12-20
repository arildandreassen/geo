import * as React from 'react'
import {useState} from 'react';
import {
    useQuery,
} from '@tanstack/react-query'
import {listCountries} from './utils/api'
import "./App.css";
import {generateAnswerIds, generateIncorrectAnswerIdsForId} from './utils/quizHelpers'
import FlagQuiz from './FlagQuiz';
import {FlagQuestions} from './types/types'

function FlagPage() {
    const [quiz, setQuiz] = useState([])
    const [result, setResult] = useState(0)

    const {isError, isSuccess, data, isLoading} = useQuery(
        ['countries'],
        listCountries
      )

    const onPracticeClick = () => {
        const quiz: FlagQuestions[] = []
        const quizLength = 10;
        const numberOfIncorrectChoices = 6
        const answerIds = generateAnswerIds(quizLength)
        
        for(const correctAnswerId of answerIds){
            const incorrectAnswerIds = generateIncorrectAnswerIdsForId(correctAnswerId, numberOfIncorrectChoices)
            quiz.push({
                correctAnswerId,
                incorrectAnswerIds
            })
        }
        setQuiz(quiz)
    }

    return  <div>
                <div>
                    {!isLoading && <button onClick={onPracticeClick}>Practice Round</button>}
                </div>
                {quiz.length && <FlagQuiz quiz={quiz} setQuiz={setQuiz} result={result} setResult={setResult}/>}
                {result}
            </div>
}

export default FlagPage