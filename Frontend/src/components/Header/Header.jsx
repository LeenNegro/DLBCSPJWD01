import React from 'react'
import './Header.css'
const Header = () => {
    return (
        <div className='Header'>
            <div className="HeaderContents">
                <h2>Welcome to GlutenFree_Tripoli</h2>
                <h3>your ultimate gateaway to a gluten-free lifestyle!</h3>
                <p> We are dedicated to providing you with the best selection of 100%
                    gluten-free products, making it easier than ever to enjoy safe, delicious,
                    and worry-free shopping.
                    <br></br>
                    From pantry staples to indulgent treats, everything
                    we offer is carefully chosen to ensure quality and satisfaction.
                </p>
                <p>
                    Whether you're gluten intolerant, have celiac disease, or simply choose to embrace
                    a gluten-free lifestyle, we've got you covered.
                    <br></br>
                    <span>
                        Shop now and experience the freedom of living gluten-free!
                    </span>
                </p>
                <button>Browse Products</button>

            </div>
        </div>
    )
}

export default Header
