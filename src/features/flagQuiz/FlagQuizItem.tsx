import * as React from 'react';
import {
    useQuery,
} from '@tanstack/react-query'
import {listCountries} from '../../services/countries'
import { useEffect, useState} from 'react';
import {Country} from '../../types/types'
import FlagImage from './FlagImage';
import CountrySelection from './CountrySelection'
import './FlagQuizItem.css'
import {numericalSort} from '../../utils/sorts'

interface QuizProps{
    quizItem: {
        correctAnswerId: number,
        incorrectAnswerIds: number[]
    },
    handleCountryClick: any
}

function FlagQuizItem({quizItem:{correctAnswerId, incorrectAnswerIds}, handleCountryClick}: QuizProps){
    const [combinedCountryIds, setCombinedCountryIds] = useState([])
    const {data} = useQuery(
        ['countries'],
        listCountries
    )

    useEffect(() => {
        const combinedResultIds = [correctAnswerId,...incorrectAnswerIds]
        combinedResultIds.sort(numericalSort).reverse()
        setCombinedCountryIds(combinedResultIds)
    }, [correctAnswerId, incorrectAnswerIds])

    return correctAnswerId && <div className='grid-container'>
            <FlagImage country={data.countries.find((country: Country) => Number(country.id) === correctAnswerId)} />
            <CountrySelection countryIds={combinedCountryIds} handleCountryClick={handleCountryClick} />
        </div>
}


export default FlagQuizItem