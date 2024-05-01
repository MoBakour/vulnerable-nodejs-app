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
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

module.exports = router;
