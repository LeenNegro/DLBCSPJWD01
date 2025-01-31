import React from 'react'
import './NavigationBar.css'
import { assets } from '../../assets/assets'

const NavigationBar = () => {
    return (
        <div className='NavigationBar'>
            <img className='logo' src={assets.logo} alt="" />
            <img className='profile' src={assets.profile_image} alt="" />
        </div>
    )
}

export default NavigationBar
