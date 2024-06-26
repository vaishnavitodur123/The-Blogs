import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    // check existing users
    const q = 'SELECT * FROM users WHERE email = ? OR username = ?';

    const { email, username, password } = req.body;
    console.log(req.body);

    db.query(q, [email, username], (err, data) => {
        if (err)
            return res.status(500).json({
                error: 'Internal Server Error. Please try again later.',
            });
        if (data.length) {
            return res.status(409).json({
                error: 'A user with that email already exists. Please choose a different one.',
            });
        }

        // hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const q =
            'INSERT INTO users(`username`, `email`, `password`) VALUES (?)';
        const values = [username, email, hash];

        // my sql database connection
        db.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL: ' + err.stack);
                return;
            }
            console.log('Connected to MySQL as id ' + db.threadId);

            // Perform database operations here
            db.query(q, [values], (err, data) => {
                if (err)
                    return res.status(500).json({
                        error: 'Internal Server Error. Please try again later.',
                    });
                return res.status(201).json({
                    message: 'Registration successful! Welcome aboard!',
                });
            });

            // Close the connection when done
            // db.end((error) => {
            //     if (error) {
            //         console.error(
            //             'Error closing the MySQL connection: ' + error
            //         );
            //     } else {
            //         console.log('Connection closed');
            //     }
            // });
        });
    });
};

export const login = (req, res) => {
    //CHECK USER

    const q = 'SELECT * FROM users WHERE email = ?';

    db.query(q, [req.body.email], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Internal Server Error. Please try again later.',
            });
        }
        if (data.length === 0) {
            return res.status(404).json({
                error: 'No records found. Please register or provide a valid email.',
            });
        }

        //Check password
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                error: 'Incorrect email or password. Please try again.',
            });
        }

        const token = jwt.sign({ id: data[0].id }, 'jwtkey');
        const { password, ...other } = data[0];

        if (token) {
            res.status(200).json({
                other,
                token,
                message: 'You have successfully logged in!',
            });
        }
    });
};
