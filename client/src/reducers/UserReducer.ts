import { Record } from "../contexts/ProductsContext";
import { User, UserInfo } from "../contexts/UserContext";

export enum UserInfoActionsKind {
    LOGIN = "LOGIN",
    LOGOFF = "LOGOFF",
}
export interface UserInfoAction {
    type: UserInfoActionsKind;
    payload: UserInfo;
}
export interface UserInfoState {
    userInfo: UserInfo;
}

export const initialState: UserInfoState = {
    userInfo: {} as UserInfo,
};

export const initializer = (initialValue = initialState) => {
    const userInfo: UserInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo") || "")
        : initialState.userInfo;
    return { userInfo: userInfo };
};

export const userReducer = (
    state: UserInfoState,
    action: UserInfoAction
): UserInfoState => {
    const userInfo = action.payload;
    switch (action.type) {
        case UserInfoActionsKind.LOGIN:
            return { ...state, userInfo: userInfo };
        case UserInfoActionsKind.LOGOFF:
            return initialState;

        default:
            return state;
    }

    // interface ProductPayload {
    //     loading?: boolean;
    //     data?: Record;
    //     error?: ApolloError | undefined;
    // }
};
