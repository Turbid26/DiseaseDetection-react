import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch blog posts from the backend
  useEffect(() => {
    fetch('/api/blog')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  const handleSubmitBlog = (e) => {
    e.preventDefault();

    const newBlog = {
      title: newBlogTitle,
      content: newBlogContent,
    };

    fetch('/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBlog),
    })
      .then((response) => response.json())
      .then((data) => {
        setBlogs([data, ...blogs]); // Add the new blog at the top
        setNewBlogTitle('');
        setNewBlogContent('');
      })
      .catch((error) => console.error('Error creating blog:', error));
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="blog-hero">
        <h1 className="blog-hero-title">Community Discussions</h1>
        <p className="blog-hero-subtitle">Share your thoughts, insights, and ideas!</p>
      </div>

      {/* Blog Form */}
      <div className="blog-form-container">
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmitBlog}>
          <input
            className="blog-input"
            type="text"
            value={newBlogTitle}
            onChange={(e) => setNewBlogTitle(e.target.value)}
            placeholder="Enter a title for your post"
            required
          />
          <textarea
            className="blog-textarea"
            value={newBlogContent}
            onChange={(e) => setNewBlogContent(e.target.value)}
            placeholder="Write your post content here"
            required
          />
          <button className="blog-submit-button" type="submit">
            Submit Post
          </button>
        </form>
      </div>

      {/* Blog Posts */}
      <div className="blog-main">
        {loading ? (
          <p>Loading...</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="blog-post-card"
              onClick={() => handleBlogClick(blog._id)}
            >
              <h2 className="blog-post-title">{blog.title}</h2>
              <p className="blog-post-preview">
                {blog.content.substring(0, 100)}...
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
