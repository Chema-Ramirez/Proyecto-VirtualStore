import { Routes, Route } from "react-router-dom"
import Login from "./login/Login"
import Register from "./register/Register"
import Home from "./home/Home"
import Checkout from "./checkout/Checkout"
import OrderSummary from "./order-summary/OrderSummary"
import OrderDetails from "./order-details/OrderDetails"
import ProtectedRoute from "../components/ProtectedRoute"

export default function Pages() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/home" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            } />

            <Route path="/checkout" element={
                <ProtectedRoute>
                    <Checkout />
                </ProtectedRoute>
            } />

            <Route path="/order-summary/:orderId" element={
                <ProtectedRoute>
                    <OrderSummary />
                </ProtectedRoute>
            } />

            <Route path="/order-details/:orderId" element={
                <ProtectedRoute>
                    <OrderDetails />
                </ProtectedRoute>
            } />
        </Routes>
    );
}
