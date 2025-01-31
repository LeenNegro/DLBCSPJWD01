import React, { useState } from 'react';
import './Add.css';
import { url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Add = () => {
    const [image, setImage] = useState(null); // Initialize image as null
    const [data, setData] = useState({
        name: "",
        description: "",
        price: 0,
        category: "Baking Essentials",
        brand: "",
        notes: "",
        grams: "",
        serving: "",
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('Image not selected');
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        formData.append("brand", data.brand);
        formData.append("notes", data.notes);
        formData.append("grams", Number(data.grams));
        formData.append("serving", Number(data.serving));

        try {
            const response = await axios.post(`${url}/api/product/add`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                // Reset the form
                setData({
                    name: "",
                    description: "",
                    price: 0,
                    category: "Baking Essentials",
                    brand: "",
                    notes: "",
                    grams: "",
                    serving: "",
                });
                setImage(null); // Reset image to null
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred while adding the product.");
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className='Add'>
            <form className='FlexColumn' onSubmit={onSubmitHandler}>
                <div className='AddImgUpload FlexColumn'>
                    <p>Upload image</p>
                    <input
                        onChange={(e) => {
                            setImage(e.target.files[0]);
                            e.target.value = ''; // Clear the input to allow re-uploading the same file
                        }}
                        type="file"
                        accept="image/*"
                        id="image"
                        hidden
                    />
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                </div>

                <div className='AddProductName FlexColumn'>
                    <p>Product name <span>*</span></p>
                    <input
                        name='name'
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        placeholder='Type here'
                        required
                    />
                </div>

                <div className='AddProductBrand FlexColumn'>
                    <p>Product Brand <span>*</span></p>
                    <input
                        name='brand'
                        onChange={onChangeHandler}
                        value={data.brand}
                        type="text"
                        placeholder='Type product brand'
                        required
                    />
                </div>

                <div className='AddProductDescription FlexColumn'>
                    <p>Product description</p>
                    <textarea
                        name='description'
                        onChange={onChangeHandler}
                        value={data.description}
                        rows={6}
                        placeholder='Write content here'
                    />
                </div>

                <div className='Quantity'>
                    <div className='Grams FlexColumn'>
                        <p>Product Grams</p>
                        <input
                            type="number"
                            name='grams'
                            onChange={onChangeHandler}
                            value={data.grams}
                            placeholder='grams'
                        />
                    </div>
                    <div className='Serving FlexColumn'>
                        <p>Product Serving</p>
                        <input
                            type="number"
                            name='serving'
                            onChange={onChangeHandler}
                            value={data.serving}
                            placeholder='servings'
                        />
                    </div>
                </div>

                <div className='AddProductNotes FlexColumn'>
                    <p>Notes</p>
                    <textarea
                        name='notes'
                        onChange={onChangeHandler}
                        value={data.notes}
                        rows={3}
                        placeholder='Write notes here'
                    />
                </div>

                <div className='AddCategoryPrice'>
                    <div className='AddCategory FlexColumn'>
                        <p>Product category <span>*</span></p>
                        <select name='category' onChange={onChangeHandler} value={data.category}>
                            <option value="Baking Essentials">Baking Essentials</option>
                            <option value="Biscuits, Cookies & Crackers">Biscuits, Cookies & Crackers</option>
                            <option value="Bread & Bakery">Bread & Bakery</option>
                            <option value="Canned Goods">Canned Goods</option>
                            <option value="Chocolate">Chocolate</option>
                            <option value="Frozen Desserts">Frozen Desserts</option>
                            <option value="IceCream & Desserts">IceCream & Desserts</option>
                            <option value="International Food">International Food</option>
                            <option value="Middle Eastern">Middle Eastern</option>
                            <option value="Pasta & Rice">Pasta & Rice</option>
                            <option value="Sauces, Condiments & Spices">Sauces, Condiments & Spices</option>
                        </select>
                    </div>
                    <div className='AddPrice FlexColumn'>
                        <p>Product Price <span>*</span></p>
                        <input
                            type="number"
                            name='price'
                            onChange={onChangeHandler}
                            value={data.price}
                            placeholder='$$'
                        />
                    </div>
                </div>

                <button type='submit' className='AddButton'>ADD NEW PRODUCT</button>
            </form>
        </div>
    );
};

export default Add;