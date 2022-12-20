const numberOfCountries = 180

const generateRandomcountryId = () => {
    return Math.floor(Math.random() * (numberOfCountries - 1) + 1)
}

const generateAnswerIds = (quizLength: number) => {
    const randomCountryIds: number[] = []
    while(randomCountryIds.length < quizLength){
        const randomId: number =  generateRandomcountryId()
        if(!randomCountryIds.includes(randomId)) {
            randomCountryIds.push(randomId)
        }
    }

    return randomCountryIds
}

const generateIncorrectAnswerIdsForId = (correctAnswerId: number, numberOfIncorrectChoices: number) => {
    const incorrectAnswerIds: number[] = []

    while(incorrectAnswerIds.length < numberOfIncorrectChoices){
        const randomId: number =  generateRandomcountryId()
        if(randomId !== correctAnswerId && !incorrectAnswerIds.includes(randomId)) {
            incorrectAnswerIds.push(randomId)
        }
    }
    return incorrectAnswerIds
}

const getCountryCodeById = (id: number) => {

}


export {
    generateAnswerIds,
    generateIncorrectAnswerIdsForId,
    getCountryCodeById
}