import * as React from 'react';
import {
    useQuery,
} from '@tanstack/react-query'
import {listCountries} from '../../services/countries'
import { useEffect, useState, useContext } from 'react';
import {Country, FlagQuestions} from '../../types/types'
import FlagImage from './FlagImage';
import './FlagQuiz.css'
import {numericalSort} from '../../utils/sorts'

interface FlagProps{
    quiz:FlagQuestions[],
}

function FlagQuiz({quiz}: FlagProps){
    const [combinedCountryIds, setCombinedCountryIds] = useState([])
    const [quizIndex, setQuizIndex] = useState(0)
    const [isEnded, setIsEnded] = useState(false)
    const {data
    } = useQuery(
        ['countries'],
        listCountries
    )

    useEffect(() => {
        loadQuizAtIndex(quiz, quizIndex)
    }, [quiz, quizIndex])

    const loadQuizAtIndex = (quiz: FlagQuestions[], quizIndex: number) => {
        const combinedResultIds = [quiz[quizIndex].correctAnswerId,...quiz[quizIndex].incorrectAnswerIds]
        combinedResultIds.sort(numericalSort).reverse()
        setCombinedCountryIds(combinedResultIds)
    }


    const handleCountryClick = (event: any) => {
        const guessedId = event.target.getAttribute('data-country-id')
        if(quiz[quizIndex].correctAnswerId === Number(guessedId)){
            console.log('correct')
        } else {
            console.log('wrong')
        }

        if(quizIndex < quiz.length -1){
            const nextIndex = quizIndex + 1
            setQuizIndex(nextIndex)
            loadQuizAtIndex(quiz,nextIndex )
        } else {
            setIsEnded(true)
        }

    }

    return quiz && !isEnded && <div className='grid-container'>
            <FlagImage country={data.countries.find((country: Country) => Number(country.id) === quiz[quizIndex].correctAnswerId)} />
            <div className='grid-item grid-item-2'>{
                combinedCountryIds.map((countryId: number) => { 
                    const {name} = data.countries.find((country: Country) => Number(country.id) === countryId)
                    return <div key={countryId}>
                        <div className='country-selection' data-country-id={countryId} onClick={handleCountryClick}>{name}</div>
                        </div> 
                })
            }</div>
        </div>

}


export default FlagQuiz