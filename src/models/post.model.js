const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
    username: String,
    text: String,
    visible: {
        type: Boolean,
        default: true,
    },
});

const Post = model("Post", PostSchema);
module.exports = Post;
