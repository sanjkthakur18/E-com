/* const asyncHandler = require("express-async-handler");
const validateMongoId = require("../utils/updateMongoId");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");

// Create New Blog
const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json(newBlog);
    } catch (error) {
        throw new Error(error);
    }
});

// Update The Blog
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateBlog);
    } catch (error) {
        throw new Error(error);
    }
});

// Get The Blog
const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const getBlog = await Blog.findById(id).populate("likes").populate("dislikes");
        const updateViews = await Blog.findByIdAndUpdate(
            id, {
            $inc: { numViews: 1 },
        },
            {
                new: true,
            }
        )
        res.json(getBlog);
    } catch (error) {
        throw new Error(error);
    }
});

// Get All Blog
const getAllBlog = asyncHandler(async (req, res) => {
    try {
        const getBlogs = await Blog.find();
        res.json(getBlogs);
    } catch (error) {
        throw new Error(error);
    }
});

// Delete a Blog
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json(deleteBlog);
    } catch (error) {
        throw new Error(error);
    }
});


// Like Functionality
const likeBlog = asyncHandler(async (req, res) => {
    console.log("User in likeBlog: ", req.user);
    console.log(req.body);
    const { blogId } = req.body;
    validateMongoId(blogId);
    console.log("From BlogID: ", blogId);
    try {
        // Find the blog which you want to be liked
        const blog = await Blog.findById(blogId);
        // find the login user
        const loginUserId = req?.user?._id;
        // find if the user has liked the blog
        const isLiked = blog?.isLiked;
        // find if the user has disliked the blog
        const alreadyDisliked = blog?.dislikes?.find(
            (userId) => userId?.toString() === loginUserId?.toString()
        );
        if (alreadyDisliked) {
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $pull: { dislikes: loginUserId },
                    isDisliked: false,
                },
                { new: true }
            );
            res.json(blog);
        }
        if (isLiked) {
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $pull: { likes: loginUserId },
                    isLiked: false,
                },
                { new: true }
            );
            res.json(blog);
        } else {
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $push: { likes: loginUserId },
                    isLiked: true,
                    isDisLiked: false,
                },
                { new: true }
            );
            res.json(blog);
        }
    } catch (error) {
        throw new Error(error);
    }
});

// DisLike Functionality
const dislikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoId(blogId);
    try {
        // Find the blog which you want to be liked
        const blog = await Blog.findById(blogId);
        // find the login user
        const loginUserId = req?.user?._id;
        // find if the user has liked the blog
        const isDisLiked = blog?.isDisliked;
        // find if the user has disliked the blog
        const alreadyLiked = blog?.likes?.find(
            (userId) => userId?.toString() === loginUserId?.toString()
        );
        if (alreadyLiked) {
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $pull: { likes: loginUserId },
                    isLiked: false,
                },
                { new: true }
            );
            res.json(blog);
        }
        if (isDisLiked) {
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $pull: { dislikes: loginUserId },
                    isDisliked: false,
                },
                { new: true }
            );
            res.json(blog);
        } else {
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $push: { dislikes: loginUserId },
                    isDisliked: true,
                    isLiked: false,
                },
                { new: true }
            );
            res.json(blog);
        }
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog, likeBlog, dislikeBlog }; */