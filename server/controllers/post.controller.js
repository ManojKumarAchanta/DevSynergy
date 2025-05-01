import Post from "../models/post.model.js";

//feed or posts of all users 
export const getAllPosts = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}
//create a post
export const createPost = async(req, res) => {
    try {
        const postData = req.body;
        const newPost = await Post.create({
            author: req.user.id,
            content: postData.content,
            title: postData.title,
            imageUrl:postData.imageUrl,
            tags:postData.tags,
        })
        return res.status(201).json({newPost,message:"Uploaded post successfully", success:true});
    } catch (error) {
        console.log("Error in createPost controller.",error.message);
        return res.status(500).json({newPost,error:"Failed to upload post", success:false});
    }
}

//get posts of a specific user
export const getPostsByUser = async(req, res) => {
    try {
        const {username} = req.params;
    } catch (error) {
        
    }
}

//delete own post 
export const deletePost = async(req, res) => {
    try {
        const {id} = req.params;
    } catch (error) {
        
    }
}