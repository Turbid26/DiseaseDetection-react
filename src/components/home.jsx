import React, {useEffect} from 'react';

const Home = () => {
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

  useEffect(() => {
    const startFallingLeaves = () => {
      setInterval(createLeaf, 500); // Create a new leaf every 500ms
    };
  
    startFallingLeaves();
  }, []);
    return (
        <div style={{ width: '100%', position: 'relative' }}>
            {/* Hero Section */}
            <section style={{
                color: 'white',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                marginTop: '100px',
                padding: '50px 20px',
                background: `url(${require('../assets/login-background.jpg')}) no-repeat center center/cover`,
                zIndex: 0
            }}>
                <h1 style={{ fontFamily: 'Poppins' }}>AGRIDIAG</h1>
                <p style={{ marginTop: '10px', fontSize: '18px', fontFamily: 'Poppins' }}>
                    We are revolutionizing agricultural diagnostics
                </p>
            </section>

            {/* About Us Section */}
            <section style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '50px auto',
                padding: '20px',
                width: '70%',
                backgroundColor: '#f9f9f9',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Poppins'
            }}>
                <div style={{ flex: 1, paddingRight: '20px' }}>
                    <button style={{
                        background: 'none',
                        border: 'none',
                        color: '#000306',
                        fontSize: '14px',
                        cursor: 'pointer',
                        padding: '0',
                        marginLeft: '10px',
                        textDecoration: 'none'
                    }}
                        onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                    >
                        About Us
                    </button>
                    <p>
                        Our solution empowers farmers with an AI-driven mobile app for swift and accurate crop disease
                        diagnosis, minimizing misdiagnosis. Researchers gain access to real-time data and trends via our
                        blog, while the public can explore a web portal rich with information on disease prevention and the
                        latest updates, fostering a connected and informed agricultural community.
                    </p>
                </div>
                <img src={require('../assets/home-stock.jpg')} alt="Agricultural Diagnostics"
                    style={{
                        flex: 1,
                        maxWidth: '100%',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        height: '400px'
                    }}
                />
            </section>
        </div>
    );
};

export default Home;
