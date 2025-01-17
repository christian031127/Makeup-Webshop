import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Import components
import Home from "./components/Home";
import Shop from "./components/Shop";
import AboutUs from "./components/AboutUs";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import FinishProcess from "./components/FinishProcess";

// Import style for leaflet
import "leaflet/dist/leaflet.css";

/**
 * Main `App` component that sets up the routing and context for the e-commerce application.
 *
 * @returns {JSX.Element} The main application layout with routes and global providers.
 */
const App: React.FC = () => (
  <CartProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/finish-process" element={<FinishProcess />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  </CartProvider>
);

/**
 * Creates the root React DOM and renders the `App` component.
 * Ensures the application mounts correctly into the HTML element with the id `app`.
 */
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
