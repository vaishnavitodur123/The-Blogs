import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import './Register.css';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();

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
        try {
            const res = await axios.post(
                'http://localhost:8800/api/auth/register',
                formData
            );
            console.log('response', res);
            if (res.status == 201) {
                toast.success(res.data.message);
                navigate('/login');
            }
        } catch (err) {
            toast.error(err.response.data.error);
            // console.log(err);
        }
    };

    return (
        <section className='register-main'>
            <span className='credit'>@madewithreact</span>
            <div className='register-container'>
                <h1>Welcome to The Blogs!</h1>
                <p>
                    Register to create your first account and start exploring
                    and sharing the world with everyone.
                </p>
                <form onSubmit={handleFormSubmit}>
                    <input
                        type='text'
                        name='username'
                        value={formData.username}
                        placeholder='User name'
                        onChange={handleInputChange}
                        required
                        autoComplete='off'
                    />
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        placeholder='Email'
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
                    <button type='submit'>Register</button>
                </form>
                <span>
                    Already have an account?{' '}
                    <Link to='/login' className='link'>
                        Log In
                    </Link>{' '}
                </span>
            </div>
            <div className='coverImg-Register' />
        </section>
    );
}
