import { createContext, Dispatch, FC, useEffect, useReducer } from "react";

import {
    ShippingAddress,
    ShippingAddressAction,
    shippingAddressInitializer,
    shippingAddressInitialState,
    shippingAddressReducer,
} from "../reducers/ShippingReducer";

interface ShippingContextProps {
    shippingAddress: ShippingAddress;
    shippingAddressDispatch: Dispatch<ShippingAddressAction>;
}
export const ShippingContext = createContext({} as ShippingContextProps);

const ShippingContextProvider: FC = ({ children }) => {
    const [shipping, shippingAddressDispatch] = useReducer(
        shippingAddressReducer,
        shippingAddressInitialState,
        shippingAddressInitializer
    );

    useEffect(() => {
        localStorage.setItem(
            "shippingAddress",
            JSON.stringify(shipping.shippingAddress)
        );
    }, [shipping]);
    const shippingAddress = shipping.shippingAddress;
    return (
        <ShippingContext.Provider
            value={{ shippingAddress, shippingAddressDispatch }}
        >
            {children}
        </ShippingContext.Provider>
    );
};
export default ShippingContextProvider;
