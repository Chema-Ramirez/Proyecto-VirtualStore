import { Routes, Route } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import Home from "./Home"
import Checkout from "./Checkout"
import OrderSummary from "./OrderSummary"
import Profile from "./Profile"
import Admin from "./Admin"
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

            <Route path="/user/:orderId" element={
                <ProtectedRoute>
                    <OrderSummary />
                </ProtectedRoute>
            } />


            <Route path="/profile/:userId" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />


            <Route path="/admin" element={
                <ProtectedRoute>
                    <Admin />
                </ProtectedRoute>
            } />
        </Routes>
    );
}
