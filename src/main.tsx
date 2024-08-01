import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import "./assets/global.css";
import {CategoryProvider} from './contexts/CategoryContext';
import {CartProvider} from "./contexts/CartContext.tsx";
import {OrderDetailsProvider} from "./contexts/OrderDetailsContext.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter basename={import.meta.env.BASE_URL}>
        <CategoryProvider>
            <CartProvider>
                <OrderDetailsProvider>
                    <App/>
                </OrderDetailsProvider>
            </CartProvider>
        </CategoryProvider>
    </BrowserRouter>
);
