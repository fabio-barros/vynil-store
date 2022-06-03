import { Record } from "../contexts/ProductsContext";

export interface ShippingAddress {
    address: string;
    number: string;
    city: string;
    postalCode: string;
    state: string;
}

export enum ShippingActionsKind {
    SAVE_SHIPPING_ADDRESS = "SAVE_SHIPPING_ADDRESS",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",
    CLEAR_CART = "CLEAR_CART",
}
export interface ShippingAddressAction {
    type: ShippingActionsKind;
    payload: ShippingAddress;
}
export interface ShippingAddressState {
    shippingAddress: ShippingAddress;
}

export const shippingAddressInitialState: ShippingAddressState = {
    shippingAddress: {} as ShippingAddress,
};

export const shippingAddressInitializer = (
    initialValue = shippingAddressInitialState
) => {
    const shippingAddress: ShippingAddress = localStorage.getItem(
        "shippingAddress"
    )
        ? JSON.parse(localStorage.getItem("shippingAddress") || "")
        : shippingAddressInitialState.shippingAddress;
    return { shippingAddress: shippingAddress };
};

export const shippingAddressReducer = (
    state: ShippingAddressState,
    action: ShippingAddressAction
): ShippingAddressState => {
    const shippingAddress = action.payload;
    switch (action.type) {
        case ShippingActionsKind.SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: shippingAddress };

        default:
            return state;
    }
};
