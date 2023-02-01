import * as React from 'react'
import './QuizResult.css'

function QuizResult({quizResult}:any) {
    const fileExtension = 'svg'
    
   return <div className='highscores'>
    {quizResult.map((result:any) => {
        const {country_code,name, status,duration} = result
        const flag = require(`../../assets/flags/${country_code}.${fileExtension}`)
        return <div className='highscore-container' key={`${name}_${status}`}>
            <div className='grid-item-2 justify-end'><img src={`${flag}`} style={{height:'10px', border:'1px solid black'}}/></div>
            <div className='grid-item-3 justify-start'>{name}</div>
            <div className={`grid-item-4 ${status}`}>{status}</div>
            <div className='grid-item-5'>{(duration / 1000).toFixed(2)}</div>
        </div>
    })}
   </div>


}

export default QuizResult