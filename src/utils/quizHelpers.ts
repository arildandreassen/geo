import { Country } from "../types/types"

const generateRandomCountryId = (quizlength: number) => {
    return Math.floor(Math.random() * (quizlength - 1) + 1)
}

const generateCorrectAnswerIds = (listOfCountries: Country[]) => {
    return generateRandomCountryId(listOfCountries.length)
}

const generateIncorrectAnswerIdsForId = (correctAnswerId: number, listOfCountries: Country[], numberOfIncorrectChoices: number) => {
    const incorrectAnswerIds: number[] = []

    while(incorrectAnswerIds.length < numberOfIncorrectChoices){
        const randomId: number =  generateRandomCountryId(listOfCountries.length)
        if(randomId !== correctAnswerId && !incorrectAnswerIds.includes(randomId)) {
            incorrectAnswerIds.push(randomId)
        }
    }
    return incorrectAnswerIds
}

export {
    generateCorrectAnswerIds,
    generateIncorrectAnswerIdsForId,
}