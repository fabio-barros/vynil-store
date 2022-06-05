import { Record } from "../contexts/ProductsContext";

export interface CartProduct extends Record {
    // id: string;
    // artistName: string;
    // albumName: string;
    // releaseDate: number;
    // // producers: Producer[];
    // albumCover: string;
    // // genres: string[];
    // description: string;
    // price: number;
    // qtyInStock: number;
    // rating: number;
    // // reviews: Review[];
    // reviewsQty: number;
    qty: number;
}

export enum CartActionsKind {
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",
    CLEAR_CART = "CLEAR_CART",
}
export interface CartAction {
    type: CartActionsKind;
    payload: CartProduct;
}
export interface CartState {
    cartItems: CartProduct[];
}

export const initialState: CartState = {
    cartItems: [],
};

export const initializer = (initialValue = initialState) => {
    const cartItems: CartProduct[] = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems") || "")
        : initialState.cartItems;
    return { cartItems: cartItems };
};

export const cartReducer = (
    state: CartState,
    action: CartAction
): CartState => {
    const item = action.payload;
    switch (action.type) {
        case CartActionsKind.ADD_TO_CART:
            const existItem = state.cartItems.find((x) => x.id === item.id);
            if (existItem) {
                const newState = {
                    cartItems: state.cartItems.map((x) =>
                        x.id === existItem.id ? item : x
                    ),
                    loading: false,
                };

                return newState;
            } else {
                const newState = {
                    cartItems: [...state.cartItems, item],
                    loading: false,
                };

                return newState;
            }

        case CartActionsKind.REMOVE_FROM_CART:
            const productToBeRemoved = state.cartItems.find(
                (x) => x.id === item.id
            );

            return productToBeRemoved
                ? {
                      cartItems: state.cartItems.filter(
                          (item) => item.id !== productToBeRemoved.id
                      ),
                  }
                : { ...state };
        case CartActionsKind.CLEAR_CART:
            return initialState;

        default:
            return state;
    }
};

// interface ProductPayload {
//     loading?: boolean;
//     data?: Record;
//     error?: ApolloError | undefined;
// }
