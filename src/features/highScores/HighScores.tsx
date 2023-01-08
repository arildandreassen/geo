import * as React from 'react'
import {useState, useEffect} from 'react';
import {listHighscores} from '../../services/highscores'
import './HighScores.css'

function HighScores() {
    const [highscores, setHighScores] = useState([])
    useEffect(() => {
        listHighscores().then(response => {
            setHighScores(response.highscores)
            console.log(response)
        })
    },[])

    return <div>
        {highscores.length > 0 && highscores.map(({name, score}) => {
            return <div className='grid-container-highscore'>
                <div className='grid-item-2 score-item'>{name}</div>
                <div className='grid-item-3 score-item'>{score}</div>
            </div>
        })}
    </div>
}

export default HighScores