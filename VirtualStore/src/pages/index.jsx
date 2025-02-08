import { Routes, Route } from "react-router-dom";
import Login from "./login/Login"
import Home from "./home/Home";

export default function Pages() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />}></Route>
        </Routes>
    )
}
