import * as React from 'react';
import { useState, useEffect } from 'react';
import './Timer.css'

function Timer({stopwatch}: any) {
    const [time, setTime] = useState('0')

    useEffect(() => {

        const timer = setTimeout(() => {
            setTime((stopwatch.getElapsedRunningTime() / 1000).toFixed(2))
        }, 100);
        return () => clearTimeout(timer);
    })

    return <div>
        <div className='timer'>{time}s</div>
    </div>
}

export default Timer