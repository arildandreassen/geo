import * as React from 'react';
import {useState, useEffect} from 'react';
import './Profile.css'

function Profile() {
    const defaultProfile = {
        firstname:'',
        lastname:''
    }

    const [profile, setProfile] = useState(defaultProfile)
    const [canEdit, setCanEdit] = useState(false);

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
        setCanEdit(false)
    }

    const handleEdit = () => {
        setCanEdit(true)
    }

    return <div>
        <div>Profile</div>
        <div className='profile-container'>
        {canEdit ?
            <form onSubmit={handleSubmit} className='grid-item-2' >
                <div className='grid-item-2 profile-container'>
                    <label>First name: </label>
                    <input type='text' name='firstname' onChange={handleFormChange} value={profile?.firstname}></input>
                </div>
                <div className='grid-item-2 profile-container'>
                    <label>Last name: </label>
                    <input type='text' name='lastname' onChange={handleFormChange} value={profile?.lastname}></input>
                </div>
                <input type='submit' value='Save' className='standard-button grid-item-2'/>
            </form>: 
            <>
                <div className='grid-item-2 profile-container'>
                    <label>First name:</label>
                    <div>{profile.firstname}</div>
                </div>
                <div className='grid-item-2 profile-container'>
                    <label>Last name:</label>
                    <div>{profile.lastname}</div>
                </div>
                <div className='grid-item-2'><div onClick={handleEdit} className='standard-button'>Edit</div></div>
            </>}
        </div>
    </div>
}

export default Profile