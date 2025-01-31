import React, { useContext, useState } from 'react';
import './NavigationBar.css';
import { assets } from "../../assets/assets";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const NavigationBar = ({ setShowLogin }) => {
    const [list, setList] = useState("Home");
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext); // Added token and setToken here
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate('/');
    };

    const loginButton = token ? (
        <button onClick={logout}>Logout</button>
    ) : (
        <button onClick={() => setShowLogin(true)}>Sign In</button>
    );

    return (
        <div className='NavigationBar'>
            <Link to='/'>
                <img src={assets.logo} alt="" className='logo' />
            </Link>
            <ul className="NavigationBarList">
                <Link to="/" onClick={() => setList("Home")} className={`${list === "Home" ? "active" : ""}`}>Home</Link>
                <a href='#ExploreCategories' onClick={() => setList("Products")} className={`${list === "Products" ? "active" : ""}`}>Products</a>
                <Link to="/track-order" onClick={() => setList("TrackOrder")} className={`${list === "TrackOrder" ? "active" : ""}`}>Track Order</Link>
                <a href='#Footer' onClick={() => setList("Contact-Us")} className={`${list === "Contact-Us" ? "active" : ""}`}>Contact Us</a>
            </ul>
            <div className="NavigationBarRight">
                <img src={assets.search_icon} alt="" />
                <div className='NavigationBarSearchIcon'>
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt="" />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>

                {loginButton}
            </div>
        </div>
    );
};

export default NavigationBar;
