const data = require('../data/data');
const PostModel = require('../models/post');
const postService = require('../services/post-service');

const getPost = async (req, res, next) => {
    const id = req.params.id;
    try {
        const post = await postService.getPost(id);
        //console.log(post);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        res.json(post);
    } catch (error) {
        next(error);
    }
}

const getPosts= async(req, res, next) => {
    try
    {
        const posts = await postService.getPosts();
        res.setHeader("Total", posts.length);
        res.json(posts);
    }catch(error){
        next(error);
    }
}

const createPost=async(req, res)=>{
    const newPost = req.body;
    try{
        const savedPost = await postService.createPost(newPost);
        res.status(201).json(savedPost);
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal error with the post"
        });
    }
    
}


const updatePost = async (req, res, next) => {
    const id = req.params.id;
    const postToUpdate = req.body;
    try {
        const updatedPost = await postService.updatePost(id, postToUpdate);
        if (!updatedPost) {
            return res.status(404).json({ message: "Post does not exist." });
        }
        res.json(updatedPost);
    } catch (error) {
        next(error);
    }
}

const deletePost= async (req, res, next)=> {
    const id= req.params.id;
    try {
        await postService.deletePost(id);
        return res.status(404).json({
            message: "Post deleted correctly"
        });
    } catch (error) {
        next(error);
    }
}

const createComment=async (req, res) =>{
    const idPost = req.params.id;
    const Newcomment = req.body;
    try{
        const postToUpdate = await PostModel.findById(idPost);
        postToUpdate.comments.push(Newcomment); 
        await postToUpdate.save();
        console.log(postToUpdate);
    }catch(error){
        console.log(error)
    }

}

const deleteComment = async (req, res, next) =>{
    console.log("eliminarController")
    const id= req.params.id;
    const postId = req.params.post;
    try {
        await postService.deleteComment(id, postId);
        return res.status(200).json({
            message: "Post deleted correctly"
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost,
    createComment,
    deleteComment
}