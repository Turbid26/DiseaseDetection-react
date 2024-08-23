import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/history.css'; // Assuming the CSS is in the same path

const History = () => {
  

  return (
    <div className="container">

      <main>
        <div className="b">x  
          <h1 style={{ textAlign: 'center', position: 'relative', top: '100px' }}>History Page</h1>
          <Link to="/projects">
            <div className="project">
              <img id="p" src={require('../assets/plant.png') }alt="Project" />
              <div>
                <h1 style={{ position: 'relative', left: '350px', color: 'darkgreen' }}>Project1</h1>
                <p style={{ fontSize: '20px', color: 'black', zIndex: 10 }}>
                  The standard chunk of Lorem Ipsum used since thLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default History;
