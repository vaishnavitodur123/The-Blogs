
import bcrypt from "bcryptjs";

export const register = (req, res) => {

    // check existing users
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    db.query(q, [email, username], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User already exists");

        // hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"
        const values = [
            username,
            email,
            hash
        ]

        db.query(q, [values], (err,data) => {
            if (err) return res.json(err);
            return res.status(200).json("New user added!");
        })
    })
}
export const login = (req, res) => {
    res.send("login")
}
export const logout = (req, res) => {
    res.send("logout")
}