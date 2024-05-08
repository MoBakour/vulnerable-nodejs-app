const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post.model");
const postRouter = require("./controllers/post.controller");

// config dotenv
require("dotenv").config();

// config express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// env vars
const DB_NAME = process.env.DB_NAME;
const DB_URI = process.env.DB_URI;
const PORT = +process.env.PORT || 3000;

// connect to db
mongoose
    .connect(DB_URI, {
        dbName: DB_NAME,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// routes
app.use(postRouter);

app.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.render("home.ejs", { posts });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});
