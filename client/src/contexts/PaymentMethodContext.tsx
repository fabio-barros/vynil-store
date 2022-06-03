import { ApolloError, useLazyQuery, useQuery } from "@apollo/client";
import { createContext, Dispatch, FC, useEffect, useReducer } from "react";

import {
    CartAction,
    CartActionsKind,
    CartProduct,
    cartReducer,
    CartState,
    initializer,
    initialState,
} from "../reducers/CartReducer";
import {
    Record,
    RecordsInventoryData,
    GET_RECORD_QUERY,
} from "./ProductsContext";

interface PaymentMethodContextProps {
    cartItems: CartProduct[];
    dispatch: Dispatch<CartAction>;
}
export const PaymentMethodContext = createContext(
    {} as PaymentMethodContextProps
);

const PaymentMethodContextontextProvider: FC = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialState, initializer);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
    }, [cart]);
    const cartItems = cart.cartItems;
    return (
        <PaymentMethodContext.Provider value={{ cartItems, dispatch }}>
            {children}
        </PaymentMethodContext.Provider>
    );
};
export default PaymentMethodContextontextProvider;
