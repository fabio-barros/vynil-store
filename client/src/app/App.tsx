import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Home } from "../components/pages/Home";
import { ProductScreen } from "../components/pages/ProductScreen";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ProductContextProvider from "../contexts/ProductsContext";
import CartScreen from "../components/pages/CartScreen";
import CartContextProvider from "../contexts/CartContext";
import LoginScreen from "../components/pages/LoginScreen";
import UserContextProvider from "../contexts/UserContext";
import RegisterScreen from "../components/pages/RegisterScreen";
import RegisterContextProvider from "../contexts/RegisterContext";
import ProfileScreen from "../components/pages/ProfileScreen";
import ShippingScreen from "../components/pages/ShippingScreen";
import PaymentScreen from "../components/pages/PaymentScreen";
import PlaceOrderScreen from "../components/pages/PlaceOrderScreen";
import ShippingContextProvider from "../contexts/ShippingContext";
import PaymentMethodContextontextProvider from "../contexts/PaymentMethodContext";

const client = new ApolloClient({
    uri: process.env.REACT_APP_SERVER,
    cache: new InMemoryCache(),
});

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <ProductContextProvider>
                    <CartContextProvider>
                        <UserContextProvider>
                            <RegisterContextProvider>
                                <ShippingContextProvider>
                                    <PaymentMethodContextontextProvider>
                                        <Header />
                                        <Container fluid className="py-3 main">
                                            {/* <Container> */}
                                            <Routes>
                                                <Route
                                                    path="/login"
                                                    element={<LoginScreen />}
                                                />
                                                <Route
                                                    path="/profile"
                                                    element={<ProfileScreen />}
                                                />
                                                <Route
                                                    path="/register"
                                                    element={<RegisterScreen />}
                                                />
                                                <Route
                                                    path="/"
                                                    element={<Home />}
                                                />
                                                <Route
                                                    path="/product/:id"
                                                    element={<ProductScreen />}
                                                />
                                                <Route
                                                    path="/cart/:id"
                                                    element={<CartScreen />}
                                                />
                                                <Route
                                                    path="/cart"
                                                    element={<CartScreen />}
                                                />
                                                <Route
                                                    path="/shipping"
                                                    element={<ShippingScreen />}
                                                />
                                                <Route
                                                    path="/payment"
                                                    element={<PaymentScreen />}
                                                />
                                                <Route
                                                    path="/placeorder"
                                                    element={
                                                        <PlaceOrderScreen />
                                                    }
                                                />
                                                <Route
                                                    path="/login/shipping"
                                                    element={<ShippingScreen />}
                                                />
                                            </Routes>
                                            {/* </Container> */}
                                        </Container>
                                    </PaymentMethodContextontextProvider>
                                </ShippingContextProvider>
                            </RegisterContextProvider>
                        </UserContextProvider>
                    </CartContextProvider>
                </ProductContextProvider>
                <Footer />
            </ApolloProvider>
        </>
    );
}

export default App;
