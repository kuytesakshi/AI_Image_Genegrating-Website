import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch posts' });
    }
});

// Create a post
router.route('/').post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;

        // Validate input
        if (!name || !prompt || !photo) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Upload photo to Cloudinary
        const photoUrl = await cloudinary.uploader.upload(photo);
        const photoUrlString = photoUrl.secure_url; // Extract the URL

        // Create new post
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrlString
        });

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ success: false, message: 'Failed to create post' });
    }
});

export default router;
