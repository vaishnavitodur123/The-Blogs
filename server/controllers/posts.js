import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const getPosts = (req, res) => {
    const q = req.query.cat
        ? 'SELECT * FROM posts WHERE cat=?'
        : 'SELECT * FROM posts';

    db.query(q, [req.query.cat], (err, data) => {
        if (err)
            return res.status(500).json({
                error: 'Internal Server Error. Please try again later.',
            });

        return res.status(200).json(data);
    });
};

export const getPost = (req, res) => {
    const q =
        'SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ';

    db.query(q, [req.params.id], (err, data) => {
        if (err)
            return res.status(500).json({
                error: 'Internal Server Error. Please try again later.',
            });

        return res.status(200).json(data[0]);
    });
};

export const addPost = (req, res) => {
    const { token, title, desc, img, cat, date } = req.body;
    // console.log(req.body);
    if (!token) {
        return res.status(401).json({
            error: 'Authentication failed. Please log in to access this resource.',
        });
    }

    jwt.verify(token, 'jwtkey', (err, userInfo) => {
        if (err) {
            return res.status(403).json({
                error: 'Token validation failed. Please try logging in again.',
            });
        }

        const q =
            'INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)';

        const values = [title, desc, img, cat, date, userInfo.id];

        db.query(q, [values], (err, data) => {
            if (err)
                return res.status(500).json({
                    error: 'Internal Server Error. Please try again later.',
                });
            return res
                .status(201)
                .json({ message: 'Post created successfully!' });
        });
    });
};

export const deletePost = (req, res) => {
    const { token, postId } = req.body;

    if (!token) {
        return res.status(401).json({
            error: 'Authentication failed. Please log in to access this resource.',
        });
    }

    jwt.verify(token, 'jwtkey', (err, userInfo) => {
        if (err) {
            return res.status(403).json({
                error: 'Token validation failed. Please try logging in again.',
            });
        }

        const q = 'DELETE FROM posts WHERE `id` = ? AND `uid` = ?';

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) {
                return res.status(403).json({
                    error: 'You are not authorized to delete this post. You can only delete your own posts.',
                });
            }

            return res.status(200).json({ message: 'Post has been deleted!' });
        });
    });
};

export const updatePost = (req, res) => {
    const { token, postId, title, desc, img, cat } = req.body;

    if (!token) {
        return res.status(401).json({
            error: 'Authentication failed. Please log in to access this resource.',
        });
    }

    jwt.verify(token, 'jwtkey', (err, userInfo) => {
        if (err) {
            return res.status(403).json({
                error: 'Token validation failed. Please try logging in again.',
            });
        }

        const q =
            'UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?';

        const values = [title, desc, img, cat];

        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) {
                return res.status(403).json({
                    error: 'You are not authorized to delete this post. You can only delete your own posts.',
                });
            }
            return res.status(200).json({ message: 'Post has been updated!' });
        });
    });
};
