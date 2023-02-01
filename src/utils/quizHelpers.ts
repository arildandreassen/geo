import { Country, FlagQuestions } from "../types/types"
import countries from '../assets/countries/countries.json'

const generateRandomCountryId = (quizlength: number): string  => {
    return (Math.floor(Math.random() * (quizlength - 1) + 1)).toString()
}

const generateCorrectAnswerIds = (listOfCountries: Country[], quiz: FlagQuestions[]) => {
    let run = true
    let countryId = ''
    while(run){
        countryId = generateRandomCountryId(listOfCountries.length)
 
        if(!quiz.find(q =>q.correctAnswerId === countryId)){
            run = false
        }
    }
    return countryId
}

const generateIncorrectAnswerIdsForId = (correctAnswerId: string, listOfCountries: Country[], numberOfIncorrectChoices: number) => {
    const incorrectAnswerIds: string[] = []

    while(incorrectAnswerIds.length < numberOfIncorrectChoices){
        const randomId: string =  generateRandomCountryId(listOfCountries.length)
        if(randomId !== correctAnswerId && !incorrectAnswerIds.includes(randomId)) {
            incorrectAnswerIds.push(randomId)
        }
    }
    return incorrectAnswerIds
}

const getCountryCode = (countryId:string): string => {
    const country = countries.find(country => country.id === countryId)
    return country.country_code
}

export {
    generateCorrectAnswerIds,
    generateIncorrectAnswerIdsForId,
    getCountryCode
}