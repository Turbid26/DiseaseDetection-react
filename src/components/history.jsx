import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user history on component mount
  //
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError('');
        
        //Get the JWT token from localStorage or other storage method
        const username = localStorage.getItem('username');
        if (!username) {
          setError('you are not registered.');
          setLoading(false);
          return;
        }

        // Fetch history from the API
        const response = await axios.get('/api/history', {
          headers: {},
        });

        setHistory(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Inline styles for the component
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    item: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      alignItems: 'center',
    },
    image: {
      width: '150px',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '5px',
    },
    error: {
      color: 'red',
      fontWeight: 'bold',
    },
  };

  // Render logic
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (history.length === 0) {
    return <div>No history found.</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Your Upload History</h1>
      <ul style={styles.list}>
        {history.map((item) => (
          <li key={item._id} style={styles.item}>
            <div>
              <img src={item.url} alt="Uploaded" style={styles.image} />
            </div>
            <div>
              <p><strong>Diagnosis:</strong> {item.diagnosis}</p>
              <p><strong>Accuracy:</strong> {item.accuracy}%</p>
              <p><strong>Uploaded At:</strong> {new Date(item.uploadedAt).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
