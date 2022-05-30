import { Record } from "../contexts/ProductsContext";

export enum CartActionsKind {
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",
    CLEAR_CART = "CLEAR_CART",
}
export interface CartAction {
    type: CartActionsKind;
    payload: Record;
}
export interface CartState {
    cartItems: Record[];
}

export const initialState: CartState = {
    cartItems: [],
};

export const initializer = (initialValue = initialState) => {
    const cartItems: Record[] = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems") || "")
        : initialState.cartItems;
    return { cartItems: cartItems };
};

export const cartReducer = (
    state: CartState,
    action: CartAction
): CartState => {
    switch (action.type) {
        case CartActionsKind.ADD_TO_CART:
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x.id === item.id);

            if (existItem) {
                const newState = {
                    cartItems: state.cartItems.map((x) =>
                        x.id === existItem.id ? item : x
                    ),
                    loading: false,
                };
                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(newState.cartItems)
                );
                return newState;
            } else {
                const newState = {
                    cartItems: [...state.cartItems, item],
                    loading: false,
                };
                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(newState.cartItems)
                );
                return newState;
            }

        // case CartActionsKind.REMOVE_FROM_CART:
        //     return state.cartItems.filter(
        //         (item) => item.id !== action.payload.id
        //     );
        //     break;
        // case "reset":
        //     return initialState;
        //     break;

        default:
            return state;
    }
};

// interface ProductPayload {
//     loading?: boolean;
//     data?: Record;
//     error?: ApolloError | undefined;
// }
