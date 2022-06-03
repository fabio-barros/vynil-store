import { createContext, Dispatch, FC, useEffect, useReducer } from "react";
import {
    PaymentMethod,
    PaymentMethodAction,
    paymentMethodInitializer,
    paymentMethodInitialState,
    paymentMethodReducer,
} from "../reducers/PaymentMethodReducer";

interface PaymentMethodContextProps {
    paymentMethod: PaymentMethod;
    paymentMethodDispatch: Dispatch<PaymentMethodAction>;
}
export const PaymentMethodContext = createContext(
    {} as PaymentMethodContextProps
);

const PaymentMethodContextontextProvider: FC = ({ children }) => {
    const [payment, paymentMethodDispatch] = useReducer(
        paymentMethodReducer,
        paymentMethodInitialState,
        paymentMethodInitializer
    );

    useEffect(() => {
        localStorage.setItem(
            "paymentMethod",
            JSON.stringify(payment.paymentMethod)
        );
    }, [payment]);
    const paymentMethod = payment.paymentMethod;
    return (
        <PaymentMethodContext.Provider
            value={{ paymentMethod, paymentMethodDispatch }}
        >
            {children}
        </PaymentMethodContext.Provider>
    );
};
export default PaymentMethodContextontextProvider;
