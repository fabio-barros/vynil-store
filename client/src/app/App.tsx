import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { ProductScreen } from "../components/pages/ProductScreen";
// import { Home } from "../components/pages/Home";

function App() {
    return (
        <div className="App">
            <h1>Welcome to React Router!</h1>
            <Routes>
                hello
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductScreen />} />
            </Routes>
        </div>
    );
}

export default App;
