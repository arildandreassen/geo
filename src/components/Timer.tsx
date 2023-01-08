import * as React from 'react';
import { useState, useEffect } from 'react';
import './Timer.css'

function Timer() {
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds +1)
        }, 1000)
        return () => clearInterval(interval)
    }, [seconds])

    return <div className='timer'>{seconds}s</div>
}

export default Timer