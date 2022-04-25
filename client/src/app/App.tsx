import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Home } from "../components/pages/Home";
import { ProductScreen } from "../components/pages/ProductScreen";
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
    );
}

export default App;
