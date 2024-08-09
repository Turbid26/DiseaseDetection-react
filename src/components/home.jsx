import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';


const Home = () => {
    const navigate = useNavigate();
  
    const handleLoginRedirect = () => {
      navigate('/'); // Redirect to the login page
    };

    return (
        <div className="container">
            {/* Navigation Bar */}
            <nav className="navigation">
                <ul>
                    <li>Home</li>
                    <li>Services</li>
                    <li>Projects</li>
                    <li>Blog</li>
                    <li><a href="/contact">Contact</a></li>
                    <li onClick={handleLoginRedirect}>
                       <i className='bx bx-user'></i>
                       <label htmlFor="bx-user">Login</label>
                    </li>
                </ul>
            </nav>

            {/* Hero Section */}
            <section className="about">
                <h1 className="head">AGRIDIAG</h1>
                <p>We are revolutionizing agricultural diagnostics</p>
            </section>

            {/* About Us Section */}
            <section className="aboutus">
                <div>
                    <a href="#">About Us</a>
                    <p>
                        Our solution empowers farmers with an AI-driven mobile app for swift and accurate crop disease
                        diagnosis, minimizing misdiagnosis. Researchers gain access to real-time data and trends via our
                        blog, while the public can explore a web portal rich with information on disease prevention and the
                        latest updates, fostering a connected and informed agricultural community.
                    </p>
                </div>
                <img src={require('../assets/home-stock.jpg')} alt="Agricultural Diagnostics" />
            </section>
        </div>
    );
};

export default Home;
