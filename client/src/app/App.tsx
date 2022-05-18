import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Home } from "../components/pages/Home";
import { ProductScreen } from "../components/pages/ProductScreen";
<<<<<<< Updated upstream
import { Signin }  from "../components/pages/signin/Login";
function App() {
    return (

         <>   
            <Header />
             <main className="py-3">
                 <Container>
                     <Routes>
                         <Route path="/" element={<Home />} />
                         <Route
                             path="/product/:id"
                             element={<ProductScreen />}
                         />
                     </Routes>
                 </Container>
             </main>
             <Footer />
         </>
=======
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ProductContextProvider from "../contexts/ProductContext";

const client = new ApolloClient({
    uri: process.env.REACT_APP_SERVER,
    cache: new InMemoryCache(),
});

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <Header />
                <main className="py-3">
                    <Container>
                        <ProductContextProvider>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/product/:id"
                                    element={<ProductScreen />}
                                />
                            </Routes>
                        </ProductContextProvider>
                    </Container>
                </main>
                <Footer />
            </ApolloProvider>
        </>
>>>>>>> Stashed changes
    );
}

export default App;
