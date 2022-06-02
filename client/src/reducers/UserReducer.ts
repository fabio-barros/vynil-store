import { Record } from "../contexts/ProductsContext";
import { RegisteredUser } from "../contexts/RegisterContext";
import { User, UserInfo } from "../contexts/UserContext";

export enum UserInfoActionsKind {
    LOGIN = "LOGIN",
    LOGOFF = "LOGOFF",
}

export enum RegisterActionsKind {
    REGISTER = "REGISTER",
}
export interface UserInfoAction {
    type: UserInfoActionsKind;
    payload: UserInfo;
}

export interface RegisterAction {
    type: RegisterActionsKind;
    payload: RegisteredUser;
}
export interface UserInfoState {
    userInfo: UserInfo;
}

export interface RegisterState {
    user: RegisteredUser;
}

export const loginInitialState: UserInfoState = {
    userInfo: {} as UserInfo,
};
export const registerInitialState: RegisterState = {
    user: {} as RegisteredUser,
};

export const loginInitializer = (initialValue = loginInitialState) => {
    const userInfo: UserInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo") || "")
        : loginInitialState.userInfo;
    return { userInfo: userInfo };
};

export const registerInitializer = (initialValue = registerInitialState) => {
    const registeredUser: RegisteredUser = localStorage.getItem(
        "registetedUser"
    )
        ? JSON.parse(localStorage.getItem("registetedUser") || "")
        : registerInitialState.user;
    return { user: registeredUser };
};

export const loginReducer = (
    state: UserInfoState,
    action: UserInfoAction
): UserInfoState => {
    const userInfo = action.payload;
    switch (action.type) {
        case UserInfoActionsKind.LOGIN:
            return { ...state, userInfo: userInfo };
        case UserInfoActionsKind.LOGOFF:
            return loginInitialState;

        default:
            return state;
    }

    // interface ProductPayload {
    //     loading?: boolean;
    //     data?: Record;
    //     error?: ApolloError | undefined;
    // }
};

export const registerReducer = (
    state: RegisterState,
    action: RegisterAction
): RegisterState => {
    const registeredUser = action.payload;
    switch (action.type) {
        case RegisterActionsKind.REGISTER:
            return { ...state, user: registeredUser };

        default:
            return state;
    }

    // interface ProductPayload {
    //     loading?: boolean;
    //     data?: Record;
    //     error?: ApolloError | undefined;
    // }
};
