import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/contact.css'; // Adjust the path if necessary

const Contact = () => {
  return (
    <div className="container">
      <nav className="navigation">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li>Services</li>
          <li>Projects</li>
          <li>Blog</li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <i className='bx bx-user'></i>
            <label htmlFor="bx-user"><Link to="/login">Login</Link></label>
          </li>
        </ul>
      </nav>
      <div className="contact">
        <h1>Contact Us</h1>
        <p>Interested in knowing more, requesting a large product order, or would just like to say hi? Fill the form
          below to get in touch with the Farm team.</p>
        <form action="/submit-contact-form" method="post">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="full-name">Full Name</label>
              <input type="text" name="full_name" id="full-name" placeholder="Robert Wilson" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" name="email" id="email" placeholder="example@yourmail.com" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" name="phone" id="phone" placeholder="(485) 186 - 0457" />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select name="subject" id="subject">
                <option value="General Question">General Question</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" placeholder="Hello, I would like to get in touch with Farm about..."></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="submit-btn">Send Message</button>
          </div>
        </form>
      </div>
      <div className="image-side"></div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h1>AgriDiag</h1>
            <p>Copyright © AGRIDIAG | Designed by <a href="#">BRIX Templates</a> – Powered by <a href="#">Webflow</a></p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Pages</h4>
              <ul>
                <li><Link to="/home">Home</Link></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Reviews</a></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Products</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Contact us:</h4>
              <ul>
                <li><b>Ph No:</b> +91 1234567891</li>
                <li><b>Email:</b> agridiag@gmail.com</li>
                <li><b>Address:</b></li>
                <li>Kmit</li>
                <li>Narayanaguda</li>
                <li>Hyderabad</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Join Our Mailing List</h4>
              <p>Join our weekly newsletter to discover about the special process behind Farm's products.</p>
              <form>
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
