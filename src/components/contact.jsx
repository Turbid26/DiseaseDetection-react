import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Define the styles as a function
const styles = {
  container: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'white',
  },
  formContainer: {
    backgroundColor: 'white',
    position: 'relative',
    left: '400px',
    top: '80px',
    justifyContent: 'center',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
  },
  heading: {
    position: 'relative',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: '600',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '30px',
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '20px',
  },
  formGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    marginBottom: '8px',
    color: '#333',
  },
  input: {
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    fontSize: '16px',
    color: '#333',
    backgroundColor: '#f9f9f9',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  textarea: {
    height: '100px',
    resize: 'none',
  },
  submitBtn: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 5, 0.9)',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  submitBtnHover: {
    backgroundColor: 'yellow',
  },
  imageSide: {
    backgroundImage: `url(${require('../assets/login-background.jpg')})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    position: 'relative',
    
  },
  footer: {
    marginTop: '70px',
    padding: '20px 40px',
    backgroundColor: 'rgb(244, 244, 12)',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerLogo: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  footerLogoHeading: {
    fontSize: '24px',
  },
  footerLogoText: {
    fontSize: '14px',
    color: '#333333',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  footerColumn: {
    flex: 1,
    margin: '0 20px',
  },
  footerColumnHeading: {
    fontSize: '18px',
    color: '#333333',
    marginBottom: '10px',
  },
  footerColumnList: {
    listStyle: 'none',
    padding: '0',
  },
  footerColumnListItem: {
    marginBottom: '10px',
  },
  footerColumnListItemLink: {
    color: '#2c6c2c',
    textDecoration: 'none',
  },
  footerForm: {
    display: 'flex',
    alignItems: 'center',
  },
  footerInput: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    marginRight: '10px',
  },
  footerButton: {
    padding: '10px 20px',
    backgroundColor: '#a3c42a',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('./api/contact/submit', formData);
      alert('Form submitted successfully');
    } catch (error) {
      alert('Form not submitted');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.formContainer}>
          <h1 style={styles.heading}>Contact Us</h1>
          <p style={styles.paragraph}>
            Interested in knowing more, requesting a large product order, or would just like to say hi? Fill the form below to get in touch with the Farm team.
          </p>
          <p style={styles.imageSide} />
          <form onSubmit={handleSubmit}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="full-name" style={styles.label}>Full Name</label>
                <input type="text" name="full_name" id="full-name" placeholder="Robert Wilson" onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email Address</label>
                <input type="email" name="email" id="email" placeholder="example@yourmail.com" onChange={handleChange} style={styles.input} />
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="phone" style={styles.label}>Phone Number</label>
                <input type="tel" name="phone" id="phone" placeholder="(485) 186 - 0457" onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="subject" style={styles.label}>Subject</label>
                <select name="subject" id="subject" onChange={handleChange} required style={styles.input}>
                  <option value="General Question">General Question</option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="message" style={styles.label}>Message</label>
              <textarea name="message" id="message" placeholder="Hello, I would like to get in touch with Farm about..." onChange={handleChange} style={{ ...styles.input, ...styles.textarea }}></textarea>
            </div>
            <div style={styles.formGroup}>
              <button type="submit" style={styles.submitBtn} onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.submitBtnHover.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.submitBtn.backgroundColor}>Send Message</button>
            </div>
          </form>
        </div>
        <div style={styles.imageSide}></div>
      </div>
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <h1 style={styles.footerLogoHeading}>AgriDiag</h1>
            <p style={styles.footerLogoText}>Copyright © AGRIDIAG | Designed by <a href="https://www.brix.com" style={{ color: '#2c6c2c', textDecoration: 'none' }}>BRIX Templates</a> – Powered by <a href="https://www.webflow.com" style={{ color: '#2c6c2c', textDecoration: 'none' }}>Webflow</a></p>
          </div>
          <div style={styles.footerLinks}>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnHeading}>Pages</h4>
              <ul style={styles.footerColumnList}>
                <li style={styles.footerColumnListItem}><Link to="/home" style={styles.footerColumnListItemLink}>Home</Link></li>
                <li style={styles.footerColumnListItem}><Link to="/home" style={styles.footerColumnListItemLink}>About</Link></li>
                <li style={styles.footerColumnListItem}><Link to="/home" style={styles.footerColumnListItemLink}>Reviews</Link></li>
                <li style={styles.footerColumnListItem}><Link to="/contact" style={styles.footerColumnListItemLink}>Contact</Link></li>
                <li style={styles.footerColumnListItem}><Link to="/services" style={styles.footerColumnListItemLink}>Products</Link></li>
              </ul>
            </div>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnHeading}>Products</h4>
              <ul style={styles.footerColumnList}>
                <li style={styles.footerColumnListItem}><Link to="/home" style={styles.footerColumnListItemLink}>Smart Nutrition</Link></li>
                <li style={styles.footerColumnListItem}><Link to="/home" style={styles.footerColumnListItemLink}>Farm Diary</Link></li>
                <li style={styles.footerColumnListItem}><Link to="/home" style={styles.footerColumnListItemLink}>Smart Watering</Link></li>
                <li style={styles.footerColumnListItem}><Link to="/home" style={styles.footerColumnListItemLink}>Monitor</Link></li>
              </ul>
            </div>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnHeading}>Contact</h4>
              <ul style={styles.footerColumnList}>
                <li style={styles.footerColumnListItem}><a href="mailto:info@agriDiag.com" style={styles.footerColumnListItemLink}>info@agriDiag.com</a></li>
                <li style={styles.footerColumnListItem}><a href="tel:+123456789" style={styles.footerColumnListItemLink}>+123 456 789</a></li>
                <li style={styles.footerColumnListItem}><p style={{ ...styles.footerColumnListItemLink, color: '#333' }}>123 Farm Lane, Farmtown, FT 12345</p></li>
              </ul>
            </div>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnHeading}>Subscribe</h4>
              <form style={styles.footerForm}>
                <input type="email" placeholder="Your email" style={styles.footerInput} />
                <button type="submit" style={styles.footerButton}>Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
