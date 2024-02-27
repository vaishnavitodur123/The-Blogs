import express from "express";
import {
    addPost,
    deletePost,
    getPost,
    getPosts,
    updatePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.post("/deletePost", deletePost);
router.post("/update", updatePost);

export default router;
