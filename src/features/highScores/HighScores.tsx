import * as React from 'react'
import {
    useQuery,
} from '@tanstack/react-query'
import {listHighscores} from '../../services/highscores'

function HighScores() {
    const {data, isLoading, isSuccess} = useQuery(
        ['highscores'],
        listHighscores
    )

    return <div >
        high scores
        {/* {data && data.highscores && data.highscores.map((highscore: any) => {
            return <div>name her</div>
        })} */}
        {isSuccess}
    </div>
}

export default HighScores