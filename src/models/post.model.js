const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
    username: String,
    text: String,
});

const Post = model("Post", PostSchema);
module.exports = Post;
