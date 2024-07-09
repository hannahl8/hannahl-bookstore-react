import React, {createContext, useReducer, useContext, ReactNode, useEffect} from 'react';
import {BookItem} from '../types';
import {ShoppingCart} from '../types.ts';
import useLocalStorage from "./useLocalStorage.hook.ts";


type Action =
    | { type: 'ADD_BOOK'; book: BookItem }
    | { type: 'UPDATE_QUANTITY'; book: BookItem; quantity: number }
    | { type: 'CLEAR_CART' };

const initialState: ShoppingCart = new ShoppingCart();

const cartReducer = (state: ShoppingCart, action: Action): ShoppingCart => {
    switch (action.type) {
        case 'ADD_BOOK':
            state.addBook(action.book);
            return Object.assign(new ShoppingCart(), {...state});
        case 'UPDATE_QUANTITY':
            state.update(action.book, action.quantity);
            return Object.assign(new ShoppingCart(), {...state});
        case 'CLEAR_CART':
            state.clear();
            return Object.assign(new ShoppingCart(), {...state});
        default:
            return state;
    }
};

interface CartContextType {
    cart: ShoppingCart;
    dispatch: React.Dispatch<Action>;
}

const CartContext = createContext<CartContextType>({
    cart: initialState,
    dispatch: () => null
});

export const CartProvider = ({children}: { children: ReactNode }) => {

    // const [cart, dispatch] = useReducer(cartReducer, initialState);

    // Define a function from a JSON object to a shopping cart
    const toCart = (obj: any) => Object.assign(new ShoppingCart(), obj);

    // Read the initial cart value from local storage if present
    const [localCart, setLocalCart] = useLocalStorage<ShoppingCart>("cart", initialState, toCart);
    const [cart, dispatch] = useReducer(cartReducer, localCart);

    useEffect(() => {
        setLocalCart(cart);
    }, [cart, setLocalCart]);


    return (
        <CartContext.Provider value={{cart, dispatch}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};