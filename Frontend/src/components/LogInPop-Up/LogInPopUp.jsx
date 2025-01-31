import React, { useState, useContext } from 'react';
import './LogInPopUp.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const LogInPopUp = ({ setShowLogin }) => {
    const { setToken, url, loadCartData } = useContext(StoreContext)
    const [currentState, setCurrentState] = useState("Sign Up");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }


    const onLogin = async (e) => {
        e.preventDefault();

        let new_url = url;
        if (currentState === "Login") {
            new_url += "/api/user/login";
        } else {
            new_url += "/api/user/register";
        }

        const response = await axios.post(new_url, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            loadCartData({ token: response.data.token });
            setShowLogin(false);
        } else {
            toast.error(response.data.message);
        }
    };


    return (
        <div className='LogInPopUp'>
            <form onSubmit={onLogin} className="LogInPopUpContainer">
                <div className="LogInPopUpTitle">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="LogInPopUpInputs">
                    {currentState === "Sign Up" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : <></>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button>{currentState === "Login" ? "Login" : "Create account"}</button>

                <div className="LogInPopUpCondition">
                    <input type="checkbox" name="" id="" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currentState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    );
};

export default LogInPopUp;
