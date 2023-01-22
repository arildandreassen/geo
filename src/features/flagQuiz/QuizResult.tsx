import * as React from 'react'

function QuizResult({quizResult}:any) {
    
   return quizResult.map((result:any) => {
        const {name, status,duration} = result
        return <div className='grid-container'>
            <div className='grid-item-2'>{name}</div>
            <div className='grid-item-3'>{status}</div>
            <div className='grid-item-4'>{(duration / 1000).toFixed(2)}</div>
        </div>
    })

}

export default QuizResult