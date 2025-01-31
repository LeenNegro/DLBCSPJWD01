import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='Footer' id='Footer'>
            <div className="FooterContent">
                <div className="FooterContentLeft">
                    <img className="logo" src={assets.logo} alt="" />
                    <p>
                        At GlutenFree Tripoli Store, we are committed to providing you with the best gluten-free products,
                        ensuring quality, variety, and convenience. Our mission is to make gluten-free living easy, delicious,
                        and accessible for everyone. Explore our wide range of carefully selected products, and join us in
                        embracing a healthier lifestyle!
                    </p>
                    <div className="FooterSocialIcons">
                        <img className="icons" src={assets.facebook_icon} alt="" />
                        <img className="icons" src={assets.twitter_icon} alt="" />
                        <img className="icons" src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="FooterContentCenter">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="FooterContentRight">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+961 81 555 030 0</li>
                        <li>contact@glutenfreetripoli.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="FooterCopyright">Copyright 2025 © GlutenFreeTripoli.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer
