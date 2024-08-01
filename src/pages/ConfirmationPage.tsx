import {asDollarsAndCents, dateTimeFormatOptions} from "../utils";
import {useOrderDetails} from "../contexts/OrderDetailsContext";
import {useCart} from "../contexts/CartContext";
import "./ConfirmationPage.css";
import {BookItem} from "../types";
import {useEffect} from "react";
import confetti from "canvas-confetti";

export default function ConfirmationPage() {
    const {orderDetails} = useOrderDetails();
    console.log("conf page order details", orderDetails);

    const cardNumber = orderDetails.customer.ccNumber.slice(0, -4).replace(/./g, '*') + orderDetails.customer.ccNumber.slice(-4);
    const expDate = new Date(orderDetails.customer.ccExpDate);
    const formattedExpDate = `${(expDate.getMonth() + 1).toString().padStart(2, '0')}/${expDate.getFullYear()}`;

    const {cart} = useCart();

    const getQuantity = (book: BookItem) => {
        const lineItem = orderDetails.lineItems.find(lineItem => lineItem.bookId === book.bookId);
        if (lineItem) {
            console.log(lineItem.quantity);
            return lineItem.quantity;
        }
        return 0;
    };

    // {"order":{"orderId":26,"amount":8493,"dateCreated":1722532350000,"confirmationNumber":672129305,"customerId":26},"customer":{"customerId":26,"customerName":"Hannah Lyons","address":"12979 Hampton Forest Ct","phone":"5713322465","email":"hannahl8@vt.edu","ccNumber":"4444333322221111","ccExpDate":1725076800000},"lineItems":[{"bookId":1001,"orderId":26,"quantity":2},{"bookId":1002,"orderId":26,"quantity":2},{"bookId":1003,"orderId":26,"quantity":3}],"books":[{"bookId":1001,"title":"A Game of Thrones","author":"George R. R. Martin","description":"Everything's better with some wine in the belly.","price":1999,"rating":0,"isPublic":true,"isFeatured":true,"categoryId":1001},{"bookId":1002,"title":"A Good Year","author":"Peter Mayle","description":"The wine, a rich, dark burgundy, was poured into glasses, and they all raised their glasses in a toast.","price":499,"rating":0,"isPublic":false,"isFeatured":false,"categoryId":1001},{"bookId":1003,"title":"The Secret of Santa Vittoria","author":"Robert Crichton","description":"They were about to lose a million bottles of wine to the Germans.","price":999,"rating":0,"isPublic":false,"isFeatured":false,"categoryId":1001}]}

    useEffect(() => {
        const duration = 10 * 1000; // 10 seconds
        const end = Date.now() + duration;

        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
        const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--tertiary-color').trim();

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: {x: 0},
                colors: [primaryColor, secondaryColor, tertiaryColor]
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: {x: 1},
                colors: [primaryColor, secondaryColor, tertiaryColor]
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    }, []);


    return (
        <div id="confirmation-page">
            <section>
                <h1>Your order was placed!</h1>
                <p>
                    Your confirmation number is {orderDetails.order.confirmationNumber}
                </p>
                <p>{new Date(orderDetails.order.dateCreated).toLocaleString('en-US', dateTimeFormatOptions)}</p>
            </section>

            <section>
                <table id="order-details-table">
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderDetails.books.map((book) => (
                        <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{getQuantity(book)}</td>
                            <td>
                                {asDollarsAndCents(book.price * (getQuantity(book) || 1))}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2}>-- Delivery Surcharge --</td>
                        <td>{asDollarsAndCents(cart.surcharge)}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <strong>Total</strong>
                        </td>
                        <td>
                            <strong>{asDollarsAndCents(orderDetails.order.amount)}</strong>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </section>
            <section>
                <h1>Customer Information</h1>
                <ul>
                    <div>Name: {orderDetails.customer.customerName}</div>
                    <div>Address: {orderDetails.customer.address}</div>
                    <div>Email: {orderDetails.customer.email}</div>
                    <div>Card number: {cardNumber}</div>
                    <div>Exp Date: {formattedExpDate}</div>
                </ul>
            </section>
            <section>
                <h1>Thank you for shopping at H. L. Lyons Books & Brews</h1>
            </section>
        </div>
    );
}
