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

interface ShippingContextProps {
    cartItems: CartProduct[];
    dispatch: Dispatch<CartAction>;
}
export const ShippingContext = createContext({} as ShippingContextProps);

const ShippingContextProvider: FC = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialState, initializer);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
    }, [cart]);
    const cartItems = cart.cartItems;
    return (
        <ShippingContext.Provider value={{ cartItems, dispatch }}>
            {children}
        </ShippingContext.Provider>
    );
};
export default ShippingContextProvider;
