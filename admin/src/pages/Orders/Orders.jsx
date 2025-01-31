import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, currency, url } from '../../assets/assets';

const Order = () => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(`${url}/api/order/list`);
        if (response.data.success) {
            setOrders(response.data.data.reverse());
        } else {
            toast.error('Error');
        }
    };

    const statusHandler = async (event, orderId) => {
        console.log(event, orderId);
        const response = await axios.post(`${url}/api/order/status`, {
            orderId,
            status: event.target.value,
        });
        if (response.data.success) {
            await fetchAllOrders();
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className="OrderAdd">
            <h3>Order Page</h3>
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
                                <p>
                                    {order.address.city}, {order.address.country}
                                </p>
                            </div>
                            <p className="OrderItemPhone">{order.address.phone}</p>
                        </div>

                        <p>Items: {order.items.length}</p>
                        <p>
                            {currency}
                            {order.amount}
                        </p>
                        <select
                            onChange={(e) => statusHandler(e, order._id)}
                            value={order.status}
                            name="order-status"
                            id="order-status"
                        >
                            <option value="Package Preparation">Package Preparation</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Order;
