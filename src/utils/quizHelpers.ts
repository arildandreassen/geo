import { Country, FlagQuestions } from "../types/types"

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

export {
    generateCorrectAnswerIds,
    generateIncorrectAnswerIdsForId,
}