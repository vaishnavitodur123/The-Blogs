import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Write from './pages/Write/Write';
import Post from './pages/Post/Post';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Toaster } from 'sonner';
import Cookies from 'js-cookie';

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
    const navigate = useNavigate();

    useEffect(() => {
        const access_token = Cookies.get('access_token');
        if (!access_token) {
            navigate('/login');
        }
    }, []);

    return (
        <div className='app'>
            <Toaster position='top-center' />
            <div className='app_container'>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/' element={<Layout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/post/:id' element={<Post />} />
                        <Route path='/write' element={<Write />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}
