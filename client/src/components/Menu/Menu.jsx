import React, { useEffect, useState } from "react";
import "./Menu.css";
import axios from "axios";
import { Link } from "react-router-dom";
// import posts from "../../posts";

export default function Menu({ cat }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8800/api/posts/?cat=${cat}`
                );
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [cat]);

    return (
        <div className="menu-main">
            <h1>Other posts you may like</h1>
            <div className="menu-posts">
                {posts.map((post) => (
                    <div className="menu-post" key={post.id}>
                        <img
                            src={`../../../public/upload/${post?.img}`}
                            alt="post-image"
                        />
                        <h2>{post.title}</h2>
                        <Link className="link" to={`/post/${post.id}`}>
                            <button>Read More</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
