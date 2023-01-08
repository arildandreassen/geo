import * as React from 'react';
import {useState, useEffect} from 'react';

function Profile() {
    const defaultProfile = {
        name:''
    }

    const [profile, setProfile] = useState(defaultProfile)

    const getProfile = () => {
        return window.localStorage.getItem('profile')
    }

    useEffect(() => {
        const current = getProfile()
        setProfile(JSON.parse(current))
    },[])

    const handleFormChange = (event:any) => {

        const {name, value} = event.target
        setProfile(profile => {
            return {
                ...profile,
                [name]: value
            }
        })
    }


    const handleSubmit = () => {
        window.localStorage.setItem('profile', JSON.stringify(profile))
    }

    return <div>
        <div>Profile</div>
        <form onSubmit={handleSubmit} >
            <label>Name: 
                <input type='text' name='name' onChange={handleFormChange} value={profile?.name}>
            </input></label>

            <input type='submit' value='Save'/>
        </form>

    </div>
}

export default Profile