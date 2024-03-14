import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import { useParams } from 'react-router-dom';
import {
    PencilSquareIcon,
    ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { AuthContext } from '../../context/authContext.jsx';
import moment from 'moment';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import './Post.css';

export default function Post() {
    const [post, setPost] = useState({});

    const { id } = useParams();

    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8800/api/posts/${id}`
                );
                setPost(res.data);
            } catch (err) {
                toast.error(err.response.data.error);
                // console.log(err);
            }
        };
        fetchData();
    }, [id]);

    const handleDelete = async () => {
        const access_token = Cookies.get('access_token');

        const data = {
            token: access_token,
            postId: id,
        };

        try {
            if (access_token) {
                const res = await axios.post(
                    `http://localhost:8800/api/posts/deletePost`,
                    data
                );
                toast.success(res.data.message);
                navigate('/');
            }
        } catch (err) {
            toast.error(err.response.data.error);
            // console.log(err);
        }
    };

    const getHTML = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return { __html: doc.body.innerHTML };
    };

    return (
        <div className='singlePost-main'>
            <div className='singlePost-content'>
                <img src={`/upload/${post?.img}`} alt='img' />
                <div className='user'>
                    <img
                        src={
                            post.userImg
                                ? post.userImg
                                : 'https://wallpapers.com/images/high/pfp-pictures-k3dqxn3n0naxefn2.webp'
                        }
                        alt='user-img'
                    />
                    <div className='user-info'>
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser.username === post.username && (
                        <div className='editPost'>
                            <Link
                                className='link'
                                to={`/write?edit=${id}`}
                                state={post}
                            >
                                <PencilSquareIcon className='icon' />
                            </Link>
                            <Link className='link' onClick={handleDelete}>
                                <ArchiveBoxXMarkIcon className='icon' />
                            </Link>
                        </div>
                    )}
                </div>
                <div className='singlePost-content-details'>
                    <h1>{post.title}</h1>
                    <div
                        className='postDesc'
                        dangerouslySetInnerHTML={getHTML(post.desc)}
                    />
                </div>
            </div>
            <div className='singlePost-menu'>
                <Menu cat={post.cat} />
            </div>
        </div>
    );
}
