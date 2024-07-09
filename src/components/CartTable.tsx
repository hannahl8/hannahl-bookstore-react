import "./CartTable.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {useCart} from "../contexts/CartContext.tsx";
import {BookItem, ShoppingCartItem} from "../types.ts";
import {bookImageFilename} from "../utils.ts";
import {Link} from "react-router-dom";
import {useCategoryContext} from "../contexts/CategoryContext.tsx";

function CartTable() {

    const {cart, dispatch} = useCart();

    const cartItems = cart.items;

    const cartBookImage = (book: BookItem) => (
        <div className="cart-book-image">
            <img
                className="cart"
                src={`${bookImageFilename(book)}`}
                alt={book.title}
            />
        </div>
    );

    const increment = (item: ShoppingCartItem) => {
        dispatch({type: 'UPDATE_QUANTITY', book: item.book, quantity: item.quantity + 1});
    };

    const decrement = (item: ShoppingCartItem) => {
        dispatch({type: 'UPDATE_QUANTITY', book: item.book, quantity: item.quantity - 1});
    };

    const cartBookQuantity = (item: ShoppingCartItem) => (
        <div className="cart-book-quantity">
            <button className="icon-button dec-button" onClick={() => decrement(item)}>
                <FontAwesomeIcon icon={faMinusCircle}/>
            </button>
            <span className="quantity">{item.quantity}</span>
            <button className="icon-button inc-button" onClick={() => increment(item)}>
                <FontAwesomeIcon icon={faPlusCircle}/>
            </button>
        </div>
    );

    const cartTableRows = cartItems.map((item) => (
            <div className="grid-table-row" key={item.book.title}>
                <li className="grid-book-row">
                    {cartBookImage(item.book)}
                    <div className="cart-book-title">{item.book.title}</div>
                    <div className="cart-book-price">${(item.book.price / 100).toFixed(2)}</div>
                    {cartBookQuantity(item)}
                    <div className="cart-book-subtotal">
                        ${(item.book.price * item.quantity / 100).toFixed(2)}
                    </div>
                </li>
                <div className="line-sep"></div>
            </div>
        )
    );

    const clearCart = () => {
        dispatch({type: 'CLEAR_CART'});
    }

    const emptyCart = cart.empty;

    const numberOfItems = cart.numberOfItems;

    const {lastSelectedCategoryName} = useCategoryContext();

    return (
        <>
            {emptyCart ? (
                <>
                    <h1>There are no items in your cart!</h1>
                    <Link to={`/category/${lastSelectedCategoryName}`}>
                        <button className="start-shopping call-to-action-button">Back to Shopping</button>
                    </Link>
                </>
            ) : (
                <>
                    <h1>Your Shopping Cart</h1>
                    <p>Items in cart: {numberOfItems}</p>
                    <button className="clear-cart tertiary-button" onClick={clearCart}>Clear Cart</button>

                    <div className="cart-table">
                        <ul className="cart2">
                            <li className="table-heading">
                                <div className="heading-image">Book</div>
                                <div className="heading-book">Title</div>
                                <div className="heading-price">Price</div>
                                <div className="heading-quantity">Quantity</div>
                                <div className="heading-subtotal">Amount</div>
                            </li>
                            {cartTableRows}
                            <li className='cart-subtotal'>
                                <div className="cart-subtotal-label">Subtotal:</div>
                                <div className="cart-subtotal-amount">
                                    ${(cart.subtotal / 100).toFixed(2)}
                                </div>
                            </li>
                            <li className='cart-total'>
                                <div className="cart-total-label">Total:</div>
                                <div className="cart-total-amount">
                                    ${(cart.total / 100).toFixed(2)}
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="cart-buttons">
                        <Link to={`/category/${lastSelectedCategoryName}`}>
                            <button className="continue-shopping secondary-button">Continue Shopping</button>
                        </Link>
                        <Link to='/checkout'>
                            <button className="checkout call-to-action-button">Proceed to Checkout</button>
                        </Link>
                    </div>
                </>
            )}
        </>
    );
}

export default CartTable;
