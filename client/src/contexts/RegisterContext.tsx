import { ApolloError, gql, useLazyQuery, useQuery } from "@apollo/client";
import { createContext, Dispatch, FC, useEffect, useReducer } from "react";
import {
    UserInfoAction,
    loginReducer,
    loginInitialState,
    loginInitializer,
    RegisterAction,
    registerReducer,
    registerInitialState,
    registerInitializer,
} from "../reducers/UserReducer";

import {
    Record,
    RecordsInventoryData,
    GET_RECORD_QUERY,
} from "./ProductsContext";

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

export interface RegisteredUser {
    id: string;
    username: string;
}
interface RegisterContextProps {
    user: RegisteredUser;
    registerDispatch: Dispatch<RegisterAction>;
}
export const RegisterContext = createContext({} as RegisterContextProps);

const RegisterContextProvider: FC = ({ children }) => {
    const [registeredUser, registerDispatch] = useReducer(
        registerReducer,
        registerInitialState,
        registerInitializer
    );

    useEffect(() => {
        localStorage.setItem(
            "registetedUser",
            JSON.stringify(registeredUser.user)
        );
    }, [registeredUser]);
    const user = registeredUser.user;
    return (
        <RegisterContext.Provider value={{ user, registerDispatch }}>
            {children}
        </RegisterContext.Provider>
    );
};
export default RegisterContextProvider;
