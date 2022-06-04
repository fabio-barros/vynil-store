import { Order } from "../contexts/OrderContext";
import { Record } from "../contexts/ProductsContext";

export enum OrderActionsKind {
    SAVE_ORDER = "SAVE_ORDER",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",
    CLEAR_CART = "CLEAR_CART",
}
export interface OrderAction {
    type: OrderActionsKind;
    payload: Order;
}
export interface OrderState {
    order: Order;
}

export const orderInitialState: OrderState = {
    order: {} as Order,
};

export const orderInitializer = (initialValue = orderInitialState) => {
    const order: Order = localStorage.getItem("order")
        ? JSON.parse(localStorage.getItem("order") || "")
        : orderInitialState.order;
    return { order: order };
};

export const orderReducer = (
    state: OrderState,
    action: OrderAction
): OrderState => {
    const order = action.payload;
    switch (action.type) {
        case OrderActionsKind.SAVE_ORDER:
            return { ...state, order: order };

        default:
            return state;
    }
};
