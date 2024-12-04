import React, { useState, useEffect } from 'react';
import '../styles/blog.css'

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch blog posts from the backend
  useEffect(() => {
    fetch('api/blog')
      .then(response => response.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(error => {
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

  const handleSubmitComment = (blogId) => {
    const commentData = { username: localStorage.getItem("username"), comment: newComment };

    fetch(`http://localhost:5000/api/blog/${blogId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => response.json())
      .then((data) => {
        setBlogs(
          blogs.map((blog) =>
            blog._id === blogId ? { ...blog, comments: data.comments } : blog
          )
        );
        setNewComment('');
      })
      .catch((error) => console.error('Error adding comment:', error));
  };

  return (
    <div className="blog-container">
  <h1 className="blog-header">Community Discussions</h1>

  {/* Create a new blog */}
  <form onSubmit={handleSubmitBlog} className="blog-form">
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
    <button className="blog-button" type="submit">
      Submit Post
    </button>
  </form>

  {/* Display blog posts */}
  {loading ? (
    <p className="loading-text">Loading...</p>
  ) : (
    blogs.map((blog) => (
      <div key={blog._id} className="blog-post">
        <h2 className="blog-post-title">{blog.title}</h2>
        <p className="blog-post-content">{blog.content}</p>
        <div className="blog-comments-section">
          <h3 className="blog-comments-header">Comments</h3>
          <ul className="blog-comments-list">
            {blog.comments.map((comment, index) => (
              <li key={index} className="blog-comment">
                <strong className="comment-author">{comment.username}:</strong>{" "}
                {comment.comment}
              </li>
            ))}
          </ul>
          <textarea
            className="comment-input"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here"
          />
          <button
            className="comment-button"
            onClick={() => handleSubmitComment(blog._id)}
          >
            Submit Comment
          </button>
        </div>
      </div>
    ))
  )}
</div>

  );
};

export default Blog;
