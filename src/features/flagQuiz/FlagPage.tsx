import * as React from 'react'
import {useState, useEffect, useRef} from 'react';
import {listCountries} from '../../services/countries'
import {generateCorrectAnswerIds, generateIncorrectAnswerIdsForId} from '../../utils/quizHelpers'
import FlagQuizItem from './FlagQuizItem';
import {FlagQuestions} from '../../types/types'
import {addHighscore} from '../../services/highscores'
import Timer from '../../components/Timer';

type quizResult = {
    name: string
    status: string
}

function FlagPage() {
    const quizLength = 10;
    const numberOfIncorrectChoices = 6
    const penaltyForWrongAnswer = 50000 //milliseconds

    const totalQuizTime = useRef(0)
    let flagTimer = new Date().getTime()
    let defaultQuizResult: quizResult[] = []
    while(defaultQuizResult.length < quizLength){
        defaultQuizResult.push({
            name:'unknown',
            status:'unknown'})
    }
    const quizResult = useRef(defaultQuizResult)

    const [quiz, setQuiz] = useState([])
    const [quizIndex, setQuizIndex] = useState(0)
    const [countries, setCountries] = useState([])
    const [quizStarted, setQuizStarted] = useState(false)

    useEffect(() => {
        listCountries().then(response => {
            setCountries(response.countries)
        })
        totalQuizTime.current = 0
    }, [])

    const getCountryName = (countryId: number) => {
        const country = countries.find(country => country.id === countryId)
        return country.name
    }

    const createNewQuiz = () => {
        const quiz: FlagQuestions[] = []

        while(quiz.length < quizLength){
            const correctAnswerId = generateCorrectAnswerIds(countries)
            const incorrectAnswerIds = generateIncorrectAnswerIdsForId(correctAnswerId, countries, numberOfIncorrectChoices)
            quiz.push({
                correctAnswerId,
                incorrectAnswerIds
            })
        }
        setQuiz(quiz)
        setQuizStarted(true)
        quizResult.current = defaultQuizResult
        totalQuizTime.current = 0
        flagTimer = new Date().getTime()
    }

    const isSelectionCorrect = (guessedId: any) => {
        return quiz[quizIndex].correctAnswerId === Number(guessedId)
    }

    const handleCorrectAnswer = (countryId:number) => {
        const now = new Date().getTime()
        const duration = now - flagTimer
        totalQuizTime.current += duration
        flagTimer = new Date().getTime()
        quizResult.current[quizIndex] = {
            name: getCountryName(countryId),
            status: 'correct'
        }
        
    }

    const handleIncorrectAnswer = (countryId:number) => {
        console.log(countries)
        totalQuizTime.current += penaltyForWrongAnswer
        quizResult.current[quizIndex] = {
            name: getCountryName(countryId),
            status: 'incorrect'
        }
    }

    const isQuizFinished = () => {
        return quizIndex === quiz.length -1
    }

    const handleEndOfQuiz = () => {
        const profileString = window.localStorage.getItem('profile')
        const profile = JSON.parse(profileString)
        addHighscore(profile.name, totalQuizTime.current)
        setQuiz([])
        setQuizIndex(0)
    }

    const handleCountryClick = async (event: any) => {
        const guessedId = event.target.getAttribute('data-country-id')

        if(isSelectionCorrect(guessedId)){
            handleCorrectAnswer(guessedId)
        } else {
            handleIncorrectAnswer(guessedId)
        }

        if(isQuizFinished()){
            handleEndOfQuiz()
        } else {
            // advance the quiz to the next index
            setQuizIndex(quizIndex => quizIndex + 1)
        }
    }

    return  (
        <div>
            <div>FLAG QUIZ</div>
            <div>
                {!countries.length && <div>Please wait. Creating Quiz...</div>}
                {countries.length > 0 && !quiz.length && <button onClick={createNewQuiz}>Start Quiz</button>}
            </div>
            <div>
                {quiz.length > 0 && <Timer />}
            </div>
            <div>
                {quiz.length > 0 && <FlagQuizItem quizItem={quiz[quizIndex]} countries={countries} handleCountryClick={handleCountryClick}/>}
            </div>
            <div>
                {quizStarted &&
                <div className='grid-bar'>{quizResult.current.map((res: quizResult, index:any) => {
                    const status = res.status || 'unknown'
                    return <div className={`grid-item-${index+1} ${status}`}>{res.name}</div>
                })}
                </div>}
            </div>
        </div>
    )
}

export default FlagPage