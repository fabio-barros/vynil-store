import { gql } from "@apollo/client";
import { createContext, Dispatch, FC, useEffect, useReducer } from "react";
import {
    RegisterAction,
    registerReducer,
    registerInitialState,
    registerInitializer,
} from "../reducers/UserReducer";

export interface RegisterUserInput {
    username: string;
    email: string;
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
