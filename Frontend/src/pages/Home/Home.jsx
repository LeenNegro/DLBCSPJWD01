import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreProducts from '../../components/ExploreCategories/ExploreCategories'
import ProductDisplay from '../../components/ProductsDisplay/ProductDisplay'
const Home = () => {

    const [category, setCategory] = useState("All");

    return (
        <div>
            <Header />
            <ExploreProducts category={category} setCategory={setCategory} />
            <ProductDisplay category={category} />
        </div>
    )
}

export default Home
