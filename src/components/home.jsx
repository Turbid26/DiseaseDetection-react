import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/home.css'; // Assuming styles are saved in App.css

import BannerCareImage from '../assets/banner_care_effortlessly_75159b4a57.webp';
import HomeStock from '../assets/home-stock.jpg';
import Sustainable from '../assets/Sustainable-Innovation-crop-3.png';
import img from '../assets/c89e77-iStock-1364679535.jpg';
import green from '../assets/green-energy.webp';
import logo from '../assets/logo.jpg';



const Home = () => {
  // Function to create a leaf element and add to the DOM
  const createLeaf = () => {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    let a = Math.random();

    // Assign random leaf type
    if (a > 0.5) {
      leaf.textContent = '🍃';
    } else if (a < 0.25) {
      leaf.textContent = '🍂';
    } else if (a < 0.4) {
      leaf.textContent = '🌿';
    } else if (a < 0.6) {
      leaf.textContent = '🍁';
    } else if (a < 0.7) {
      leaf.textContent = '🍀';
    }

    // Set random position and animation duration
    leaf.style.left = `${Math.random() * 100}vw`;
    const fallDuration = Math.random() * 1 + 1;
    leaf.style.animationDuration = `${fallDuration}s`;
    document.body.appendChild(leaf);

    // Remove leaf after falling
    setTimeout(() => {
      leaf.remove();
    }, fallDuration * 1000);
  };

  // Start falling leaves on component mount
  useEffect(() => {
    const interval = setInterval(createLeaf, 500); // Create a leaf every 500ms
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div>
      {/* Head Content */}
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900&display=swap"
          rel="stylesheet"
        />
        <title>AgriDiag | About Us</title>
      </Helmet>

      {/* Main Content */}
      <div className="container">
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1>Welcome to AgriDiag</h1>
            <p>Your trusted partner in modern agriculture</p>
          </div>
          <img 
            src={logo} 
            style={{ width: '500px', marginLeft: '20px' }} 
            alt="Effortless Crop Care" 
          />
        </header>
        <section>
          <h2>About Us</h2>
          <p>
            AgriDiag bridges cutting-edge technology and traditional farming practices to empower farmers and plant
            enthusiasts worldwide. With our AI-driven diagnostic system, we identify and manage plant diseases with
            precision, helping crops thrive and ensuring food security.
          </p>
          <p>
            Our custom-built ML model can recognize over <strong>10,000 crop diseases and conditions</strong> with{' '}
            <strong>96% accuracy</strong>, offering tailored solutions to safeguard your plants. With expert consultations
            and actionable insights, we make farming smarter, more sustainable, and accessible for everyone.
          </p>
        </section>
        <section>
          <h2>Learn and Grow with AgriDiag</h2>
          <p>
            We believe in the power of <strong>knowledge and innovation</strong>. AgriDiag offers an intuitive platform
            for farmers and hobbyists to learn about crop health and disease management. Access rich guides, real-time
            diagnostics, and educational content to sharpen your farming skills while nurturing your crops.
          </p>
        </section>
        <section>
          <h2>Effortless Crop Care</h2>
          <p>
            Simply scan your crop with a smartphone, tablet, or laptop to identify diseases instantly. Our platform
            provides customized treatment plans, nutrient suggestions, and even weather-based farming tips to optimize
            yields.
          </p>
          <p>
            Take advantage of <strong>light and moisture meters</strong>, <strong>fertilizer calculators</strong>, and{' '}
            <strong>pest control strategies</strong> to maintain healthy, productive fields.
          </p>
          <img src={BannerCareImage} alt="Effortless Crop Care" />
        </section>
        <section>
          <h2>Expert Guidance Anytime</h2>
          <p>
            AgriDiag connects you to a network of certified agricultural experts available 24/7. Whether it's pest
            outbreaks, soil quality issues, or complex disease patterns, our team is ready to provide personalized advice.
            With just a few clicks, you can consult with experienced agronomists and botanists who are as invested in your
            success as you are.
          </p>
          <img src={HomeStock} alt="Expert Guidance" />
        </section>
        <section>
          <h2>Sustainability and Innovation</h2>
          <p>
            At AgriDiag, we champion sustainable farming practices and biodiversity conservation. By leveraging{' '}
            <strong>AI, IoT, and AR technologies</strong>, we equip you with tools to adapt to climate challenges while
            minimizing environmental impact. Together, we aim to create a resilient, green future for agriculture.
          </p>
          <img src={Sustainable} alt="Sustainability and Innovation" />
        </section>
        <section>
          <h2>Join the AgriDiag Community</h2>
          <p>
            With users spanning continents, AgriDiag is building a vibrant network of farmers, researchers, and
            enthusiasts committed to transforming agriculture. By sharing stories, challenges, and successes, we
            collectively learn, grow, and inspire innovation in farming.
          </p>
          <img src={img} alt="Community" />
        </section>
        <section>
          <h2>Your Partner for a Greener Tomorrow</h2>
          <p>
            At AgriDiag, our mission is clear: to make farming smarter, more efficient, and sustainable. Whether you're
            managing a small garden or running large-scale operations, AgriDiag is here to support your agricultural
            journey every step of the way.
          </p>
          <p>Join us in reshaping the future of farming. Let's grow, together.</p>
          <img src={green}alt="Greener Tomorrow" />
        </section>
      </div>
    </div>
  );
};

export default Home;
