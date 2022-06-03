import { Record } from "../contexts/ProductsContext";

export interface PaymentMethod {
    method: string;
}

export enum PaymentMethodActionsKind {
    SAVE_PAYMENT_METHOD = "SAVE_PAYMENT_METHOD",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",
}
export interface PaymentMethodAction {
    type: PaymentMethodActionsKind;
    payload: PaymentMethod;
}
export interface PaymentMethodState {
    paymentMethod: PaymentMethod;
}

export const paymentMethodInitialState: PaymentMethodState = {
    paymentMethod: {} as PaymentMethod,
};

export const paymentMethodInitializer = (
    initialValue = paymentMethodInitialState
) => {
    const paymentMethod: PaymentMethod = localStorage.getItem("paymentMethod")
        ? JSON.parse(localStorage.getItem("paymentMethod") || "")
        : paymentMethodInitialState.paymentMethod;
    return { paymentMethod: paymentMethod };
};

export const paymentMethodReducer = (
    state: PaymentMethodState,
    action: PaymentMethodAction
): PaymentMethodState => {
    const paymentMethod = action.payload;
    switch (action.type) {
        case PaymentMethodActionsKind.SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: paymentMethod };

        default:
            return state;
    }
};
