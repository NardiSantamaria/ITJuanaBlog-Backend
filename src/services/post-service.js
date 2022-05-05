const Post = require('../models/post');

const createPost = async (post)=>{
    const newPost = new Post(post);
    await newPost.save();
    return newPost;
}

const getPosts =async ()=>{
    const posts= await Post.find().lean().exec();
    return posts;
}

const getPost = async (id) => {
    const post = await Post.findById(id).lean().exec();
    return post;
}

const deletePost = async (id) => {
    await Post.findByIdAndDelete(id).exec();
}

const updatePost = async (id, post) => {
    const updatePost = await Post.findByIdAndUpdate(id, post, {
        returnDocument: "after"
    }).lean().exec();
    return updatePost;
}

const newComment = async (id, comment) => {
    const updatePost = await Post.findByIdAndUpdate(id, comment, {
        returnDocument: "after"
    }).lean().exec();
    return updatePost;
}

const deleteComment = async (id, postId )=>{
    const postToUpdate = await Post.findById(postId);
    const commentTodeleteIndex = await postToUpdate.comments.findIndex(comment => comment._id == id);
    
    if(commentTodeleteIndex=>0){
        console.log(commentTodeleteIndex);
        postToUpdate.comments.splice(commentTodeleteIndex, 1);
        await postToUpdate.save();
    }
    else{
        console.log("does not exist");
        console.log(commentTodeleteIndex);
    }
}

const updateComment = async (id, postId, comment)=>{
    try{
        const postToUpdate = await Post.findById(postId);
        const commentToUpdateIndex = await postToUpdate.comments.findIndex(comment => comment._id == id);
        postToUpdate.comments[commentToUpdateIndex] = comment; 
        await postToUpdate.save();
        console.log(postToUpdate);
    }catch(error){
        console.log(error)
    }
}





module.exports = {
    createPost,
    getPosts, 
    getPost, 
    deletePost,
    updatePost,
    newComment,
    deleteComment,
    updateComment
}