export type Answer = {
    name: string
    status: string
    duration:  number
}

export type Country = {
    id: string,
    name: string,
    country_code: string
}

export type FlagQuestions = {
    correctAnswerId: string
    incorrectAnswerIds: string[]
}
