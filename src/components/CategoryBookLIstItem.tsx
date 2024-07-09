import {BookItem, CategoryItem} from "../types";
import {icons, bookImageFilename} from "../utils";
import "./CategoryBookListItem.css";
import {useCart} from "../contexts/CartContext.tsx";

export default function CategoryBookListItem(props: { book: BookItem, categories: CategoryItem[] }) {

    const {dispatch} = useCart();
    const handleAddToCart = () =>
        dispatch(
            {type: 'ADD_BOOK', book: props.book}
        );

    const category = props.categories.find((category) => category.categoryId === props.book.categoryId);

    let icon = '';

    if (category) {
        icon = icons[category.name];
    }

    return (
        <li key={props.book.bookId} className="book-box">
            <div className="book-title" title={props.book.title}>{props.book.title}</div>
            <div className="book-author">{props.book.author}</div>
            <div className="book-price">${(props.book.price / 100).toFixed(2)}</div>
            {props.book.isPublic && (
                <a className="book-open"><i className="fa-brands fa-readme"></i></a>
            )}

            <div className="book-image">
                <a href="#">
                    <img
                        src={`${bookImageFilename(props.book)}`}
                        alt={props.book.title}
                    />
                </a>
            </div>
            <p className="book-quote" title={props.book.description}><i
                className={icon}></i> - {props.book.description}</p>
            <button className="primary-button" onClick={handleAddToCart}><i className="fa-solid fa-cart-shopping"></i> Add to Cart</button>
        </li>
    );
}
