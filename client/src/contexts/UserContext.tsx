import { ApolloError, gql, useLazyQuery, useQuery } from "@apollo/client";
import { createContext, Dispatch, FC, useEffect, useReducer } from "react";
import {
    UserInfoAction,
    loginReducer,
    loginInitialState,
    loginInitializer,
} from "../reducers/UserReducer";

import {
    Record,
    RecordsInventoryData,
    GET_RECORD_QUERY,
} from "./ProductsContext";

export interface LoginUserInput {
    username: string;
    password: string;
}
export const LOGIN_MUTATION = gql`
    mutation login($input: LoginUserInput!) {
        login(loginUserInput: $input) {
            access_token
            user {
                id
                username
            }
        }
    }
`;
export interface RegisterUserInput {
    username: string;
    password: string;
}
export const REGISTER_MUTATION = gql`
    mutation register($input: CreateUserInput!) {
        register(createUserInput: $input) {
            id
            username
        }
    }
`;
export interface User {
    id: string;
    username: string;
}
export interface UserInfo {
    access_token: string;
    user: User;
}
interface UserContextProps {
    userInfo: UserInfo;
    dispatch: Dispatch<UserInfoAction>;
}
export const UserContext = createContext({} as UserContextProps);

const UserContextProvider: FC = ({ children }) => {
    const [user, dispatch] = useReducer(
        loginReducer,
        loginInitialState,
        loginInitializer
    );

    const [registeredUser, registerDispatch] = useReducer(
        loginReducer,
        loginInitialState,
        loginInitializer
    );

    useEffect(() => {
        localStorage.setItem("userInfo", JSON.stringify(user.userInfo));
    }, [user]);
    const userInfo = user.userInfo;
    return (
        <UserContext.Provider value={{ userInfo, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;
