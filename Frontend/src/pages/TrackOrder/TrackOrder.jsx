import React, { useContext, useEffect, useState } from 'react';
import './TrackOrder.css';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import { StoreContext } from '../../context/StoreContext';


const TrackOrder = () => {
    const [orders, setOrders] = useState([]);

    const { getTotalCartAmount, list, token, url, cartItems, setCartItems, currency, deliveryCharge } = useContext(StoreContext);

    const fetchAllOrders = async () => {
        if (!token) {
            console.error("Token is missing or undefined");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            let userId = decoded.id;

            console.log("User ID:", userId);

            const response = await axios.post(
                `${url}/api/order/userorders`,
                { userId },
                { headers: { token } }
            );

            console.log("API Response:", response);
            setOrders(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to fetch orders. Please try again.");
        }
    };


    useEffect(() => {
        fetchAllOrders();
    }, []);


    return (
        <div className="OrderAdd">
            <h3>Track Orders</h3>
            <div className="OrderList">
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map((order, index) => (
                        <div key={index} className="OrderItem">
                            <img src={assets.parcelbox_icon} alt="Parcel Icon" />
                            <div>
                                <div className="OrderItemProduct">
                                    {order.items.map((item, idx) => (
                                        <span key={idx}>
                                            {item.name} x {item.quantity}
                                        </span>
                                    ))}
                                </div>
                                <p className="OrderItemName">
                                    {order.address.firstName} {order.address.lastName}
                                </p>
                                <div className="OrderItemAddress">
                                    <p>{order.address.fulladdress},</p>
                                    <p>{order.address.city}, {order.address.country}</p>
                                </div>
                                <p className="OrderItemPhone">{order.address.phone}</p>
                            </div>

                            <p>Items: {order.items.length}</p>
                            <p>
                                {currency}
                                {order.amount}
                            </p>
                            <p>Status: {order.status}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TrackOrder;
