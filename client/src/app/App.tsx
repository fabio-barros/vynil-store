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
                            <Header />
                            <main className="py-3 main">
                                {/* <Container> */}
                                <Routes>
                                    <Route
                                        path="/login"
                                        element={<LoginScreen />}
                                    />
                                    <Route path="/" element={<Home />} />
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
                                </Routes>
                                {/* </Container> */}
                            </main>
                        </UserContextProvider>
                    </CartContextProvider>
                </ProductContextProvider>
                <Footer />
            </ApolloProvider>
        </>
    );
}

export default App;
