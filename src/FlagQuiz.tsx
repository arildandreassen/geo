import * as React from 'react';
import {
    useQuery,
  } from '@tanstack/react-query'
import {listCountries} from './utils/api'
import { useEffect, useState, useContext } from 'react';
import {FlagQuestions} from './types/types'
import FlagImage from './FlagImage';
import './FlagQuiz.css'

interface FlagProps{
    quiz:FlagQuestions[],
    setQuiz:any,
    result: any,
    setResult: any
}

interface Country {
    id: string,
    name: string,
    country_code: string
}

function FlagQuiz({quiz, setQuiz, result, setResult}: FlagProps){
    const[combinedCountryIds, setCombinedCountryIds] = useState([])
    const {isError, isSuccess, data
    } = useQuery(
        ['countries'],
        listCountries
    )

    useEffect(() => {
        const combinedResultIds = [quiz[0].correctAnswerId,...quiz[0].incorrectAnswerIds]
        combinedResultIds.sort()
        setCombinedCountryIds(combinedResultIds)
    }, [quiz])


    const handleCountryClick = (event: any) => {
        const guessedId = event.target.getAttribute('data-country-id')
        if(quiz[0].correctAnswerId === Number(guessedId)){
            console.log('correct')
            setResult((res: any) => {
                return res+1
            })
        } else {
            console.log('wrong')
        }
        quiz.shift()
        setQuiz([...quiz])
        if(quiz.length){
            const {correctAnswerId, incorrectAnswerIds} = quiz[0]
            const combinedResultIds = [correctAnswerId,...incorrectAnswerIds]
            combinedResultIds.sort()
            setCombinedCountryIds([...combinedResultIds])
        }
    }

    return quiz && <div className='grid-container'>
            <FlagImage country={data.countries.find((country: Country) => Number(country.id) === quiz[0].correctAnswerId)} />
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