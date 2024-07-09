import HeaderDropdown from "./HeaderDropdown";
import "./AppHeader.css";
import {Link} from "react-router-dom";
import {siteImagePrefix} from "../utils";
import {useState} from "react";
import {useCart} from "../contexts/CartContext";

export default function AppHeader() {
    const {cart} = useCart();
    const [searchClicked, setSearchClicked] = useState(false);

    return (
        <header className="container">
            <section className="bookstore-logo-and-title">
                <Link className="logo-and-text" to="/">
                    <img
                        src={`${siteImagePrefix}/Books%20and%20Brews%20Logo.png`}
                        alt="H. L. Lyons Books & Brews Logo"
                    />
                </Link>
                <Link className="logo-and-text" to="/">
                    <div className="text-logo-container">
                        <h1 className="text-logo-owner">H. L. Lyons</h1>
                        <h1 className="text-logo-name">Books & Brews</h1>
                    </div>
                </Link>
            </section>
            <section className="menu-search-cart-login">
                <HeaderDropdown/>
                {searchClicked ? (
                    <input
                        type="text"
                        placeholder="Search"
                        className="search"
                        onBlur={() => setSearchClicked(false)}
                    />
                ) : (
                    <button className="button" onClick={() => setSearchClicked(true)}><i
                        className="fa-solid fa-search"></i> SEARCH</button>
                )}
                <Link to="/cart">
                    <button className="button">
                        <i className="fa-solid fa-cart-shopping"></i> ( <span
                        className='cart-size'>{cart.numberOfItems}</span> ) CART
                    </button>
                </Link>
                <button className="button"><i className="fa-solid fa-right-to-bracket"></i> SIGN IN</button>
            </section>
        </header>
    );
}
