import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import WelcomePage from "./pages/WelcomePage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import "./App.css";
import {Routes, Route} from "react-router-dom";
import ConfirmationPage from "./pages/ConfirmationPage.tsx";


export default function App() {
    return (
        <div className="app">
            <AppHeader/>
            <Routes>
                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/category/:categoryName" element={<CategoryPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/confirmation" element={<ConfirmationPage/>}/>
            </Routes>
            <AppFooter/>
        </div>
    );
}
