const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// Create a new blog post
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const newBlog = new Blog({
      title,
      content,
      comments: [], // Ensure an empty array for comments is initialized
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Error creating blog post' });
  }
});

// Get all blog posts (returns only essential information for listing)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({}, 'title content createdAt'); // Fetch specific fields only
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// Get details of a single blog post, including comments
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog details:', error);
    res.status(500).json({ message: 'Error fetching blog details' });
  }
});

// Add a comment to a blog post
router.post('/:id/comment', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, comment } = req.body;

    if (!username || !comment) {
      return res.status(400).json({ message: 'Username and comment are required' });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blog.comments.push({ username, comment });
    await blog.save();

    res.status(200).json({ comments: blog.comments }); // Only return updated comments
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment' });
  }
});

module.exports = router;
