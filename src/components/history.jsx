import React, { useEffect } from 'react';

import '../styles/history.css'; // Assuming the CSS is in the same path

const History = () => {
  // Function to create a leaf element and add to the DOM
  const createLeaf = () => {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.zIndex = 0;
    let a = Math.random();
    
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

    leaf.style.left = `${Math.random() * 100}vw`;
    const fallDuration = Math.random() * 1 + 1;
    leaf.style.animationDuration = `${fallDuration}s`;
    document.body.appendChild(leaf);

    // Remove the leaf after it falls out of the viewport
    setTimeout(() => {
      leaf.remove();
    }, fallDuration * 1000);
  };

  // Function to start the falling leaves effect
 

  // React hook to run the falling leaves effect once when the component is mounted
  useEffect(() => {
    startFallingLeaves();
  }, [startFallingLeaves]);

  return (
    <div className="container">

      <main>
        <div className="b">x  
          <h1 style={{ textAlign: 'center', position: 'relative', top: '100px' }}>History Page</h1>
          <a href="projects.jsx">
            <div className="project">
              <img id="p" src={require('../assets/plant.png') }alt="Project" />
              <div>
                <h1 style={{ position: 'relative', left: '350px', color: 'darkgreen' }}>Project1</h1>
                <p style={{ fontSize: '20px', color: 'black', zIndex: 10 }}>
                  The standard chunk of Lorem Ipsum used since thLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
};

export default History;
