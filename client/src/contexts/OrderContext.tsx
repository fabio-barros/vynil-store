import { gql } from "@apollo/client";
import { createContext, Dispatch, FC, useEffect, useReducer } from "react";
import {
    OrderAction,
    orderInitializer,
    orderInitialState,
    orderReducer,
} from "../reducers/OrderReducer";
export type CreateOrderInput = Order;

export const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
            id
            buyerID
            address
            houseNumber
            postalCode
            city
            state
            products {
                recordId
                qty
            }
            itemsPrice
            shippingPrice
            totalPrice
            status
            paymentMethod
        }
    }
`;

export interface OrderProducts {
    recordId: string;
    qty: number;
}

export interface Order {
    buyerId: string;
    address: string;
    houseNumber: string;
    city: string;
    postalCode: string;
    state: string;
    products: OrderProducts[];
    itemsPrice: string;
    shippingPrice: string;
    totalPrice: string;
    status: string;
    paymentMethod: string;
}

interface OrderContextProps {
    order: Order;
    orderDispatch: Dispatch<OrderAction>;
}
export const OrderContext = createContext({} as OrderContextProps);

const OrderContextProvider: FC = ({ children }) => {
    const [orderInfo, orderDispatch] = useReducer(
        orderReducer,
        orderInitialState,
        orderInitializer
    );

    useEffect(() => {
        localStorage.setItem("order", JSON.stringify(orderInfo.order));
    }, [orderInfo]);
    const order = orderInfo.order;
    return (
        <OrderContext.Provider value={{ order, orderDispatch }}>
            {children}
        </OrderContext.Provider>
    );
};
export default OrderContextProvider;
