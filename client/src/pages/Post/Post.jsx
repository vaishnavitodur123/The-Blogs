import React from "react";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import { useParams } from "react-router-dom";
import {
    PencilSquareIcon,
    ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/outline";
import "./Post.css";

export default function Post() {
    const { id } = useParams();

    return (
        <div className="singlePost-main">
            <div className="singlePost-content">
                <img
                    src="https://images.unsplash.com/photo-1680955886616-55b83de7489f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
                    alt="img"
                />
                <div className="user">
                    <img
                        src="https://wallpapers.com/images/high/pfp-pictures-k3dqxn3n0naxefn2.webp"
                        alt="user-img"
                    />
                    <div className="user-info">
                        <span>Akash</span>
                        <p>Posted 2 days ago</p>
                    </div>
                    <div className="editPost">
                        <Link className="link" to={`/write?edit=${id}`}>
                            <PencilSquareIcon className="icon" />
                        </Link>
                        <Link className="link">
                            <ArchiveBoxXMarkIcon className="icon" />
                        </Link>
                    </div>
                </div>
                <div className="singlePost-content-details">
                    <h1>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatum, quidem?
                    </h1>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Facere voluptatem dolores aliquam ad accusamus sit
                        rem sapiente quas suscipit provident neque, laboriosam
                        recusandae quo quia sunt repellendus eum quidem deleniti
                        cupiditate temporibus vitae. Nisi quaerat harum ad atque
                        consequatur corporis?
                    </p>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Facere voluptatem dolores aliquam ad accusamus sit
                        rem sapiente quas suscipit provident neque, laboriosam
                        recusandae quo quia sunt repellendus eum quidem deleniti
                        cupiditate temporibus vitae. Nisi quaerat harum ad atque
                        consequatur corporis?
                    </p>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Facere voluptatem dolores aliquam ad accusamus sit
                        rem sapiente quas suscipit provident neque, laboriosam
                        recusandae quo quia sunt repellendus eum quidem deleniti
                        cupiditate temporibus vitae. Nisi quaerat harum ad atque
                        consequatur corporis?
                    </p>
                </div>
            </div>
            <div className="singlePost-menu">
                <Menu />
            </div>
        </div>
    );
}
