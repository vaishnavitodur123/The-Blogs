import express from "express";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import colors from "colors";
import connectDB from "./config/mongoDB.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.json("hello world");
});

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = 5000;
connectDB().then(() => {
    app.listen(PORT, console.log(`Server is up on port ${PORT}`.yellow.bold));
});
