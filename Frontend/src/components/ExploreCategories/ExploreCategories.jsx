import React, { useContext } from 'react';
import './ExploreCategories.css';
import { StoreContext } from '../../Context/StoreContext'


const ExploreProducts = ({ category, setCategory }) => {

    const { CategoriesList } = useContext(StoreContext);

    return (
        <div className='ExploreCategories' id='ExploreCategories'>
            <h1>Discover our Gluten-Free Selection</h1>
            <p className='ExploreCategoriesText'>
                Our mission is to offer a wide selection of gluten-free products,
                ensuring quality and satisfaction with every choice. Experience a
                lifestyle of health and flavor, crafted just for you.
            </p>
            <div className="ExploreCategoriesList">
                {CategoriesList.map((item, index) => {
                    return (
                        <div
                            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                            key={index}
                            className='ExploreCategoriesListItems'
                        >
                            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    );
                })}
            </div>
            <hr />
        </div>
    );
}

export default ExploreProducts;
