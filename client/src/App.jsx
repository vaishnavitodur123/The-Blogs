import React from "react";
import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Write from "./pages/Write/Write";
import Post from "./pages/Post/Post";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Toaster } from "sonner";

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <div className="app">
            <div className="app_container">
                <Toaster position="top-center" />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/post/:id" element={<Post />} />
                        <Route path="/write" element={<Write />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}
