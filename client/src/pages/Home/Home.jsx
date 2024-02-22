import React from "react";
import posts from "../../posts.js";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div className="home-main">
                <div className="posts">
                    {posts.map((post) => (
                        <div className="post" key={post.id}>
                            <div className="img">
                                <img src={post.img} alt="postImg" />
                            </div>
                            <div className="content">
                                <h1>{post.title}</h1>
                                <p>{post.desc}</p>
                                <Link className="link" to={`/post/${post.id}`}>
                                    <button>Read More</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
