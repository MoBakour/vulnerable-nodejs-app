const express = require("express");
const Post = require("../models/post.model");
const router = express.Router();

router.post("/post", async (req, res) => {
    try {
        const post = await Post.create({
            username: req.body.username,
            text: req.body.text,
        });

        res.status(200).json({
            success: true,
            post,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find({ visible: true });

        res.status(200).json({
            success: true,
            posts,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

router.delete("/clear", async (req, res) => {
    try {
        await Post.updateMany(
            {},
            {
                visible: false,
            }
        );

        res.status(200).json({
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

router.delete("/delete/:password", async (req, res) => {
    try {
        if (req.params.password !== process.env.PASSWORD) {
            const error = new Error("Incorrect password");
            error.code = "PASSWORD_ERROR";
            throw error;
        }

        await Post.deleteMany();

        res.status(200).json({
            success: true,
        });
    } catch (err) {
        if (err.code !== "PASSWORD_ERROR") {
            console.error(err);
        }

        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

module.exports = router;
