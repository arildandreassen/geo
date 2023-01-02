import * as React from 'react'
import {useState} from 'react';
import {
    useQuery,
} from '@tanstack/react-query'
import {listCountries} from '../../services/countries'
import {generateCorrectAnswerIds, generateIncorrectAnswerIdsForId} from '../../utils/quizHelpers'
import FlagQuiz from './FlagQuiz';
import {Country, FlagQuestions} from '../../types/types'

function FlagPage() {
    const quizLength = 3;
    const numberOfIncorrectChoices = 6
    const [quiz, setQuiz] = useState([])

    const {isError, isSuccess, data, isLoading} = useQuery(
        ['countries'],
        listCountries
    )

    const onQuizClick = () => {
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
        setQuiz(quiz)
    }

    return  <div>
                <div>
                    {!isLoading && <button onClick={onQuizClick}>New Flag Quiz</button>}
                </div>
                {quiz.length && <FlagQuiz quiz={quiz}/>}
            </div>
}

export default FlagPage