const mongoose = require('mongoose');
//PostSchema is a class
const CommentSchema = new mongoose.Schema({
    author:{
        type: String,
        required: false
    },
    comment: {
        type: String,
        required: false
    }
})
const PostSchema = new mongoose.Schema(
    //object
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type:String,
            required: false
        },
        imageUrl: {
            type: String,
            required: false
        },
        author:{
            type: String,
            required: false
        },
        comments: [
            CommentSchema
        ]
    },
    {
        timestamps: true
    }
);

const PostModel = mongoose.model("Post", PostSchema);
module.exports = PostModel;
