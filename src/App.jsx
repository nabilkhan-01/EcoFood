import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes, Navigate} from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
