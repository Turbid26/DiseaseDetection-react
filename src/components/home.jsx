import React from 'react';
import '../styles/home.css';

const Home = () => {
    return (
        <div className="container">
            {/* Hero Section */}
            <section className="about">
                <h1 className="head">AGRIDIAG</h1>
                <p>We are revolutionizing agricultural diagnostics</p>
            </section>

            {/* About Us Section */}
            <section className="aboutus">
                <div>
                    <button className='empty-button'>About Us</button>
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
