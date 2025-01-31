import { createContext, useEffect, useState } from "react";
import { CategoriesList } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:5000";
    const [Product_list, setProductList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const currency = "$";
    const deliveryCharge = 4;

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));

        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });

        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            const itemInfo = Product_list.find((product) => product._id === item);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const fetchProductList = async () => {
        try {
            const response = await axios.get(url + "/api/product/list");
            if (response.data.success) {
                setProductList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.get(url + "/api/cart/get", { headers: { token } });
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchProductList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        url,
        Product_list,
        CategoriesList,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
