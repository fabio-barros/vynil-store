import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/pages/Home";
// import { Home } from "../components/pages/Home";

function App() {
    return (
        <div className="App">
            <h1>Welcome to React Router!</h1>
            <Routes>
                hello
                <Route path="/" element={<Home />} />
                {/* <Route path="about" element={<About />} /> */}
            </Routes>
        </div>
    );
}

export default App;
