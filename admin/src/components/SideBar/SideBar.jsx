import React from 'react';
import './SideBar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className='SideBar'>
            <div className="SideBarOptions">
                <NavLink to='/add' className="SideBarOption">
                    <img src={assets.add_icon} alt="Add Items Icon" />
                    <p>Add Items</p>
                </NavLink>
                <NavLink to='/list' className="SideBarOption">
                    <img src={assets.list_icon} alt="List Items Icon" />
                    <p>List Items</p>
                </NavLink>
                <NavLink to='/orders' className="SideBarOption">
                    <img src={assets.order_icon} alt="Orders Icon" />
                    <p>Orders</p>
                </NavLink>
                <NavLink to='/track-order' className="SideBarOption">
                    <img src={assets.track_icon} alt="Track Order Icon" />
                    <p>Track Order</p>
                </NavLink>
            </div>
        </div>
    );
};

export default SideBar;