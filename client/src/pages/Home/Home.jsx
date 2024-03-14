import React, { useEffect, useState } from 'react';
// import posts from "../../posts.js";
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'sonner';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const access_token = Cookies.get('access_token');
        if (!access_token) {
            navigate('/login');
        }

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/posts/`);
                setPosts(res.data);
            } catch (err) {
                toast.error(err.response.data.error);
                // console.log(err);
            }
        };
        fetchData();
    }, []);

    const getHTML = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');

        return {
            __html: doc.body.innerHTML.split(' ').slice(20, 70).join(' '),
        };
    };

    return (
        <>
            <div className='home-main'>
                {posts.length > 0 ? (
                    <div className='posts'>
                        {posts.map((post) => (
                            <div className='post' key={post.id}>
                                <div className='img'>
                                    {post?.img ? (
                                        <img
                                            src={`/upload/${post.img}`}
                                            alt='postImg'
                                        />
                                    ) : (
                                        'Loading...'
                                    )}
                                </div>
                                <div className='content'>
                                    <h1>{post.title}</h1>
                                    <div
                                        dangerouslySetInnerHTML={getHTML(
                                            post.desc
                                        )}
                                    />
                                    <Link
                                        className='link'
                                        to={`/post/${post.id}`}
                                    >
                                        <button>Read More</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='empty-state'>
                        <p>Be the first to share your thoughts!</p>
                        <p>There are no posts here yet - </p>
                        <p>why not create a new one?</p>
                    </div>
                )}
            </div>
        </>
    );
}
