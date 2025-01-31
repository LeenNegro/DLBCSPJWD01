import React, { useState, useContext } from 'react';
import './ProductItem.css';
import { assets, url } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const ProductItem = ({ id, name, image, brand, description, notes, grams, serving, price }) => {
    const [itemCount, setItemCount] = useState(0);
    const { cartItems, addToCart, removeFromCart, currency } = useContext(StoreContext);

    if (!cartItems) {
        return <div className="ProductItem">Loading cart...</div>;
    }


    return (
        <div className="ProductItem">
            <div className="ProductItemImageContainer">

                <img className="ProductItemImage" src={`${url}/uploads/${image}`} alt={name} />
                {!cartItems?.[id] ? (
                    <img className="add" onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                ) : (
                    <div className="ProductItemCounter">
                        <img src={assets.remove_icon} onClick={() => removeFromCart(id)} alt="" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="" />
                    </div>
                )}
            </div>
            <div className="ProductItemInfo">
                <p className="ProductItemName">{name}</p>
                <p className="ProductItemBrand">{brand}</p>
                <p className="ProductItemDescription">{description}</p>
                <p className="ProductItemNotes">{notes}</p>
                <p className="ProductItemGrams">{grams ? `${grams}g` : ''}</p>
                <p className="ProductItemServing">{serving ? `${serving} servings` : ''}</p>
                <p className="ProductItemPrice">{currency}{price}</p>
            </div>
        </div>
    );
};

export default ProductItem;
