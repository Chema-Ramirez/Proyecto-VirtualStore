import { Routes, Route } from "react-router-dom";
import Login from "./login/Login"
import Home from "./home/Home";
import Checkout from "./checkout/Checkout";
import OrderSummary from "./order-summary/OrderSummary";

export default function Pages() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-summary" element={<OrderSummary />} />
        </Routes>
    )
}
