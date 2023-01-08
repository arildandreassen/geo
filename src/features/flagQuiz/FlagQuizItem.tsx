import * as React from 'react';
import { useEffect, useState} from 'react';
import {Country} from '../../types/types'
import FlagImage from './FlagImage';
import CountrySelection from './CountrySelection'
import './FlagQuizItem.css'
import {numericalSort} from '../../utils/sorts'

interface QuizProps{
    countries: Country[],
    quizItem: {
        correctAnswerId: number,
        incorrectAnswerIds: number[]
    },
    handleCountryClick: any
}

function FlagQuizItem({quizItem:{correctAnswerId, incorrectAnswerIds}, countries, handleCountryClick}: QuizProps){
    const [combinedCountryIds, setCombinedCountryIds] = useState([])


    useEffect(() => {
        const combinedResultIds = [correctAnswerId,...incorrectAnswerIds]
        combinedResultIds.sort(numericalSort).reverse()
        setCombinedCountryIds(combinedResultIds)
    }, [correctAnswerId, incorrectAnswerIds])

    return correctAnswerId && <div className='grid-container'>
            <FlagImage country={countries.find((country: Country) => Number(country.id) === correctAnswerId)} />
            <CountrySelection countries={countries} countryIds={combinedCountryIds} handleCountryClick={handleCountryClick} />
        </div>
}


export default FlagQuizItem