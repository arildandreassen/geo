import * as React from 'react'
import './header.css'
import {Link} from 'react-router-dom'

function Header() {
    return <div className='header-container'>
        <div className='header-items logo grid-item-2'>
            <span>geo</span>
            <span>brawl</span>
            <span>.com</span>
        </div>
        <div className='header-items standard-button grid-item-4'><Link to='/'>Home</Link></div>
        <div className='header-items standard-button grid-item-5'><Link to='/flags'>Flags</Link></div>
        <div className='header-items standard-button grid-item-6'><Link to='/highscores'>High Scores</Link></div>
        <div className='header-items standard-button grid-item-7'><Link to='/profile'>Profile</Link></div>
    </div>
}

export default Header