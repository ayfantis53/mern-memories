// npm installs
import mongoose from "mongoose";

// project imports
import PostMessage from "../models/posts.model.js";


/* @DESC   CreatePosts ------------------------------------------------------------------------------------
*  @ROUTE  POST /posts
*  @ACCESS public  
*---------------------------------------------------------------------------------------------------------*/
export const createPosts = async(req, res) => {
    const post    = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    
    try {
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(error) {
        res.status(409).json({ message: error.message });
    }
}

/* @DESC   GetPosts ---------------------------------------------------------------------------------------
*  @ROUTE  GET /posts
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
export const getPosts = async(req, res) => {
    const { page } = req.query;

    try {
        const LIMIT      = 6;
        // Get Starting Index of every page for pagination.
        const startIndex = (Number(page) - 1) * LIMIT;
        const total      = await PostMessage.countDocuments({});
        const posts      = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) });
    }
    catch(error) {
        res.status(404).json({ message: error.message });
    }
}

/* @DESC   getPostsBySearch -------------------------------------------------------------------------------
*  @ROUTE  GET /posts
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
export const getPostsBySearch = async (req, res) => { 
    const { searchQuery, tags } = req.query;
    
    try {
        // Find post using search words and tags.
        const title = new RegExp(searchQuery, "i");
        const posts = await PostMessage.find({ $or: [{ title: title }, {tags: {$in: tags.split(',')}}] })
        res.status(200).json({ data: posts });
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/* @DESC   GetPosts ---------------------------------------------------------------------------------------
*  @ROUTE  POST /post
*  @ACCESS public  
*---------------------------------------------------------------------------------------------------------*/
export const getPost = async(req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/* @DESC   UpdatePosts ------------------------------------------------------------------------------------
*  @ROUTE  PATCH(UPDATE) /posts/:id
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
export const updatePosts = async(req, res) => {
    const { id: _id } = req.params;
    const post        = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
}

/* @DESC   DeletePosts ------------------------------------------------------------------------------------
*  @ROUTE  DELETE /posts/:id
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
export const deletePosts = async(req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id');
    }

    await PostMessage.findByIdAndDelete(id);
    res.json('Post Deleted Successfully');
}

/* @DESC   LikePosts --------------------------------------------------------------------------------------
*  @ROUTE  PATCH(UPDATE) /posts/:id/likePost
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
export const likePosts = async(req, res) => {
    const { id } = req.params;

    if (!req.userId) { 
        return res.json({ message: "Unauthenticated"}); 
    }
    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).send(`No post with that ${id}`); 
    }

    const post   = await PostMessage.findById(id);
    const index  = post.likes.findIndex((id) => id === String(req.userId));
    
    if (index === -1) { 
        post.likes.push(req.userId); 
    }
    else { 
        post.likes = post.likes.filter((id) => id !== String(req.userId)); 
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
}

/* @DESC   commentPost ------------------------------------------------------------------------------------
*  @ROUTE  POST /posts/:id/commentPost
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
export const commentPost = async(req, res) => {
    const { id    }   = req.params;
    const { value }   = req.body;

    const post        = await PostMessage.findById(id);
    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost);
}