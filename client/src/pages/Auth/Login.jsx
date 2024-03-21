import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { AuthContext } from '../../context/authContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import './Login.css';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(AuthContext);

    useEffect(() => {
        const access_token = Cookies.get('access_token');
        if (access_token) {
            navigate('/');
        }
    }, []);

    // Function to update the state on input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            const res = await axios.post(
                'http://localhost:8800/api/auth/login',
                formData
            );
            console.log('response', res);
            if (res.status == 200) {
                toast.success(res.data.message);
                setCurrentUser(res.data.other);
                Cookies.set('access_token', res.data.token);
                navigate('/');
            }
        } catch (err) {
            toast.error(err.response.data.error);
            // console.log('Error: ', err);
        }
    };

    return (
        <section className='login-main'>
            <span className='credit'>@madewithreact</span>
            <div className='login-container'>
                <h1>Welcome back!</h1>
                <p>
                    Bridging Ideas: Connecting People through the Art of
                    Blogging
                </p>
                <form onSubmit={handleFormSubmit}>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        placeholder='Email'
                        id='email'
                        onChange={handleInputChange}
                        required
                        autoComplete='off'
                    />
                    <div className='input-pass'>
                        <input
                            type={isShow ? 'text' : 'password'}
                            name='password'
                            value={formData.password}
                            placeholder='Password'
                            onChange={handleInputChange}
                            required
                            autoComplete='off'
                        />

                        {isShow ? (
                            <EyeIcon
                                size={15}
                                className='Eye'
                                onClick={() => setIsShow(!isShow)}
                            />
                        ) : (
                            <EyeSlashIcon
                                className='Eye'
                                onClick={() => setIsShow(!isShow)}
                            />
                        )}
                    </div>
                    <button type='submit'>Login</button>
                </form>
                <span>
                    Don't have an account?{' '}
                    <Link to='/register' className='link'>
                        Register
                    </Link>{' '}
                </span>
            </div>
            <div className='coverImg-login' />
        </section>
    );
}
