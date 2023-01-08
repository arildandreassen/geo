import * as React from 'react'
import './header.css'
import {Link} from 'react-router-dom'

function Header() {
    return <div className='header-container'>
        <div className='header-items'>GEOBRAWL.COM</div>
        <div className='header-items'><Link to='/'>Home</Link></div>
        <div className='header-items'><Link to='/highscores'>High Scores</Link></div>
        <div className='header-items'><Link to='/flags'>Flags</Link></div>
        <div className='header-items'><Link to='/profile'>Profile</Link></div>
    </div>
}

export default Header