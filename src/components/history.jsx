import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/history.css'; // Assuming the CSS is in the same path

const History = () => {
  // State to hold the diagnosis history data
  const [history, setHistory] = useState([]);

  // Fetch the history data from the API when the component mounts
  useEffect(() => {
    fetch('/api/history')
      .then(response => response.json())
      .then(data => setHistory(data))
      .catch(error => console.error('Error fetching diagnosis history:', error));
  }, []);

  return (
    <div className="container">
      <main>
        <h1 style={{ textAlign: 'center', position: 'relative', top: '20px' }}>Diagnosis History</h1>
        
        {/* Render each diagnosis item */}
        {history.map((item, index) => (
          <Link to={`/projects/${item._id}`} key={index}>
            <div className="diagnosis-card">
              <img id="p" src={item.image} alt={item.diagnosis_name} style={{ maxWidth: '100px', height: 'auto', marginRight: '20px' }} />
              <div>
                <h1 style={{ position: 'relative', left: '350px', color: 'darkgreen' }}>Diagnosis {index + 1}</h1>
                <h2 style={{ position: 'relative', left: '350px', color: 'darkblue' }}>{item.diagnosis_name}</h2>
                <p style={{ fontSize: '20px', color: 'black', zIndex: 10 }}>
                  Accuracy: {(item.accuracy * 100).toFixed(2)}%
                </p>
                <p style={{ fontSize: '16px', color: 'gray' }}>
                  {item.description || 'No additional information available.'} {/* Add description or placeholder */}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default History;
