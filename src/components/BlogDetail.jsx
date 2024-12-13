import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/blogDetail.css';

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`/api/blog/${blogId}`)
      .then((response) => response.json())
      .then((data) => setBlog(data))
      .catch((error) => console.error('Error fetching blog details:', error));
  }, [blogId]);

  const handleSubmitComment = () => {
    const commentData = { 
      username: localStorage.getItem('username'), 
      comment: newComment 
    };

    fetch(`/api/blog/${blogId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => response.json())
      .then((data) => {
        setBlog((prevBlog) => ({ ...prevBlog, comments: data.comments }));
        setNewComment('');
      })
      .catch((error) => console.error('Error adding comment:', error));
  };

  if (!blog) return <p>Loading blog...</p>;

  return (
    <div>
    <div className="blog-hero">
        <h1 className="blog-hero-title">Community Discussions</h1>
        <p className="blog-hero-subtitle">Share your thoughts, insights, and ideas!</p>
      </div>
    <div className="blog-detail-container">
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <div className="blog-comments-section">
        <h2>Comments</h2>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.username}:</strong> {comment.comment}
            </li>
          ))}
        </ul>
        <textarea
          className="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here"
        />
        <button className="comment-submit-button" onClick={handleSubmitComment}>
          Submit Comment
        </button>
      </div>
    </div>
    </div>
  );
};

export default BlogDetail;
