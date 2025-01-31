import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { url, currency } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart, getTotalCartAmount, deliveryCharge } = useContext(StoreContext);
    const navigate = useNavigate();
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

    useEffect(() => {
        fetchList();
    }, []);

    // Debugging logs
    useEffect(() => {
        console.log("Cart Items Updated:", cartItems);
        console.log("New Total Amount:", getTotalCartAmount ? getTotalCartAmount() : 0);
    }, [cartItems]);

    return (
        <div className='Cart'>
            <div className="cartItems">
                <div className="cartItemsTitle">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={item._id}>
                                <div className="cartItemsTitle cartItemsItem">
                                    <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} />
                                    <p>{item.name}</p>
                                    <p>{currency}{item.price.toFixed(2)}</p>
                                    <div className="cartItemsQuantity">
                                        <button onClick={() => addToCart(item._id)}>+</button>
                                        <span>{cartItems[item._id]}</span>
                                        <button onClick={() => removeFromCart(item._id)}>-</button>
                                    </div>
                                    <p>{currency}{(item.price * cartItems[item._id]).toFixed(2)}</p>
                                    <p className='CartItemsRemoveIcon' onClick={() => removeFromCart(item._id)}>x</p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            <div className="cartBottom">
                <div className="cartTotal">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cartTotalDetails">
                            <p>Subtotal</p>
                            <p>{currency}{getTotalCartAmount ? getTotalCartAmount().toFixed(2) : "0.00"}</p>
                        </div>
                        <hr />
                        <div className="cartTotalDetails">
                            <p>Delivery Fee</p>
                            <p>{currency}{getTotalCartAmount && getTotalCartAmount() > 0 ? deliveryCharge.toFixed(2) : '0.00'}</p>
                        </div>
                        <hr />
                        <div className="cartTotalDetails">
                            <b>Total</b>
                            <b>
                                {currency}{
                                    getTotalCartAmount && getTotalCartAmount() > 0
                                        ? (getTotalCartAmount() + deliveryCharge).toFixed(2)
                                        : "0.00"
                                }
                            </b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/submitorder')}>PROCEED TO CHECKOUT</button>
                </div>

                <div className="cartPromoCode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className='cartPromoCodeInput'>
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;