import React, { useContext, useEffect, useState } from 'react'
import './MyOrder.css';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const MyOrder = () => {

    const [data, setData] = useState([]);
    const { url, token, currency } = useContext(StoreContext);

    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data);
        setLoading(false);
    };

    return (
        <button onClick={fetchOrders} disabled={loading}>
            {loading ? "Updating..." : "Track Order"}
        </button>
    );


    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    return (
        <div className='MyOrders'>
            <h2>My Orders</h2>
            <div className="Container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className='MyOrdersOrder'>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                }
                                else {
                                    return item.name + " x " + item.quantity + ", "
                                }

                            })}</p>
                            <p>{currency}{order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrder;
