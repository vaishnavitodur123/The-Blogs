import React from "react";
import "./Menu.css";
import posts from "../../posts";

export default function Menu() {
    return (
        <div className="menu-main">
            <h1>Other posts you may like</h1>
            <div className="menu-posts">
                {posts.map((post) => (
                    <div className="menu-post" key={post.id}>
                        <img src={post.img} alt="post-image" />
                        <h2>{post.title}</h2>
                        <button>Read More</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
