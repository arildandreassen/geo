import * as React from 'react';
import { useEffect, useState} from 'react';
import {Country} from '../../types/types'
import FlagImage from './FlagImage';
import CountrySelection from './CountrySelection'
import './FlagQuizItem.css'
import { numericalSort } from '../../utils/sorts';

interface QuizProps{
    countries: Country[],
    quizItem: {
        correctAnswerId: string,
        incorrectAnswerIds: string[]
    },
    handleCountryClick: any
}

function FlagQuizItem({quizItem:{correctAnswerId, incorrectAnswerIds}, countries, handleCountryClick}: QuizProps){
    const [combinedCountryIds, setCombinedCountryIds] = useState([])


    useEffect(() => {
        const combinedResultIds = [correctAnswerId,...incorrectAnswerIds]
        combinedResultIds.sort(numericalSort)
        setCombinedCountryIds(combinedResultIds)
    }, [correctAnswerId, incorrectAnswerIds])

    return correctAnswerId && <div className='grid-container'>
            <FlagImage country={countries.find((country: Country) => country.id === correctAnswerId)} />
            <CountrySelection countryIds={combinedCountryIds} handleCountryClick={handleCountryClick} />
        </div>
}


export default FlagQuizItem