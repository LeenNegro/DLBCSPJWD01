import React, { useEffect, useState } from 'react';
import './ProductDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import ProductItem from '../ProductItem/ProductItem';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url, currency } from '../../assets/assets'; // Use the imported url here


const ProductDisplay = ({ category }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/product/list`);
        if (response.data.success) {
            console.log(response.data);
            setList(response.data.data);
        } else {
            toast.error('Error');
        }
    };

    const removeProduct = async (productId) => {
        const response = await axios.post(`${url}/api/product/remove`, {
            id: productId,
        });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error('Error');
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const filteredProducts = category === "All"
        ? list
        : list.filter(item => item.category === category);

    return (
        <div className="ProductDisplay">
            <h2>Top Products for you</h2>

            {/* Display filtered products */}
            <div className="ProductsDisplayList">
                {filteredProducts.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        image={item.image}
                        brand={item.brand}
                        description={item.description}
                        notes={item.notes}
                        grams={item.grams}
                        servings={item.servings}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductDisplay;
