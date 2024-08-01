import React, {
    createContext,
    useEffect,
    useContext,
    ReactNode,
    useReducer,
} from "react";
import {OrderDetails} from "../types.ts";
import useSessionStorage from "./useSessionStorage.hook.ts";

// Define action types
type Action =
    | { type: "UPDATE"; orderDetails: OrderDetails }
    | { type: "CLEAR" };

// Define the initial state
const initialState: OrderDetails = {} as OrderDetails;

// Create the reducer function
const reducer = (_: OrderDetails, action: Action): OrderDetails => {
    switch (action.type) {
        case "UPDATE":
            return action.orderDetails;
        case "CLEAR":
            return {} as OrderDetails;
        default:
            return initialState;
    }
};

// Define the type for the context value
interface OrderDetailsContextType {
    orderDetails: OrderDetails;
    dispatch: React.Dispatch<Action>;
}

// Create the context with default values
const OrderDetailsContext = createContext<OrderDetailsContextType>({
    orderDetails: {} as OrderDetails,
    dispatch: () => {
    },
});

// Create provider component
export const OrderDetailsProvider = ({children}: { children: ReactNode }) => {
    const toOrderDetails = (obj: unknown) =>
        Object.assign({} as OrderDetails, obj);

    const [localOrderDetails, setLocalOrderDetails] =
        useSessionStorage(
            "orderDetails",
            initialState,
            toOrderDetails
        );

    const [orderDetails, dispatch] = useReducer(reducer, localOrderDetails);

    useEffect(() => {
        console.log("OrderDetailsProvider: orderDetails updated to", orderDetails);
        setLocalOrderDetails(orderDetails);
    }, [orderDetails, setLocalOrderDetails]);

    return (
        <OrderDetailsContext.Provider value={{orderDetails, dispatch}}>
            {children}
        </OrderDetailsContext.Provider>

    );
};

// Create a custom hook for easy access to the context
export const useOrderDetails = () => {
    const context = useContext(OrderDetailsContext);
    if (!context) {
        throw new Error(
            "useOrderDetailsContext must be used within a OrderDetailsProvider"
        );
    }
    return context;
};
