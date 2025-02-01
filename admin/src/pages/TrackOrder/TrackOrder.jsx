import React, { useEffect, useState } from 'react';
import './TrackOrder.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, currency, url } from '../../assets/assets';

const TrackOrder = () => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(`${url}/api/order/list`);
            if (response.data.success) {
                setOrders(response.data.data.reverse());
            } else {
                toast.error('Error fetching orders');
            }
        } catch (error) {
            toast.error('An error occurred while fetching orders');
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className="OrderAdd">
            <h3>Track Orders</h3>
            <div className="OrderList">
                {orders.map((order, index) => (
                    <div key={index} className="OrderItem">
                        <img src={assets.parcel_icon} alt="Parcel Icon" />
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
                            {parseFloat(order.amount).toFixed(2)}
                        </p>
                        <p>Status: {order.status}</p> {/* Display order status */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrackOrder;
