import React, { useContext, useEffect, useState } from 'react';
import './SubmitOrder.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const SubmitOrder = () => {

    const [list, setList] = useState([]);

    // Fetch products from the backend
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/product/list`);
            if (response.data.success) {
                console.log("Product list fetched:", response.data.data);
                setList(response.data.data);
            } else {
                console.error('Error fetching product list');
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const [payment, setPayment] = useState("cod");
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        fulladdress: "",
        city: "",
        country: "",
        phone: ""
    });

    const { getTotalCartAmount, ProductsList, token, url, cartItems, setCartItems, currency, deliveryCharge } = useContext(StoreContext);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        // Prepare order items
        let orderItems = [];
        list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        // Prepare order data
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        };

        // Place the order
        try {
            let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders");
                toast.success(response.data.message);
                setCartItems({});
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            toast.error("Order placement failed. Please try again.");
        }
    };

    const handleProceedToPayment = (e) => {
        e.preventDefault();
        if (payment === "cod") {
            placeOrder(e);
        } else {
            toast.success("Proceeding to another payment method...");
        }
    };

    useEffect(() => {
        if (!token) {
            toast.error("To place an order, please sign in first.");
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }

        fetchList();
    }, [token]);

    return (
        <form className="PlaceOrder" onSubmit={placeOrder}>
            {/* Delivery Information */}
            <div className="PlaceOrderLeft">
                <p className="title">Delivery Information</p>
                <div className="MultiField">
                    <input
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        value={data.firstName}
                        onChange={onChangeHandler}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        value={data.lastName}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <input
                    type="email"
                    placeholder="Email address"
                    name="email"
                    value={data.email}
                    onChange={onChangeHandler}
                    required
                />
                <input
                    type="text"
                    placeholder="Full address"
                    name="fulladdress"
                    value={data.fulladdress}
                    onChange={onChangeHandler}
                    required
                />
                <div className="MultiField">
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={data.city}
                        onChange={onChangeHandler}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        value={data.country}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={data.phone}
                    onChange={onChangeHandler}
                    required
                />
            </div>

            {/* Cart Totals */}
            <div className="PlaceOrderRight">
                <div className="cartTotal">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cartTotalDetails">
                            <p>Subtotal</p>
                            <p>{currency}{getTotalCartAmount().toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cartTotalDetails">
                            <p>Delivery Fee</p>
                            <p>{currency}{getTotalCartAmount() === 0 ? '0.00' : deliveryCharge.toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cartTotalDetails">
                            <b>Total</b>
                            <b>{currency}{(getTotalCartAmount() + deliveryCharge).toFixed(2)}</b>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button className="PlaceOrderSubmit" type="submit">
                Place Order
            </button>
        </form>
    );
};

export default SubmitOrder;
