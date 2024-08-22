import React, { useEffect } from 'react';
import '../styles/project.css';

const Projects = () => {
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
    const fallDuration = Math.random() * 2 + 2;
    leaf.style.animationDuration = `${fallDuration}s`;
    document.body.appendChild(leaf);

    // Remove the leaf after it falls out of the viewport
    setTimeout(() => {
      leaf.remove();
    }, fallDuration * 1000);
  };

  // Function to start the falling leaves effect
  const startFallingLeaves = () => {
    setInterval(createLeaf, 500);
  };

  // React hook to run the falling leaves effect once when the component is mounted
  useEffect(() => {
    startFallingLeaves();
  }, []);

  return (
    <div className="container">
     

      <div className="project">
        <img id="p" src="plant.png" alt="Plant" />
        <div>
          <h1 style={{ position: 'relative', left: '200px' }}>AGRIDIAG</h1>
          <p style={{ fontSize: '20px', color: 'black', zIndex: 10 }}>
            The standard chunk of Lorem Ipsum used since thLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

            Why do we use it?
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

            Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
