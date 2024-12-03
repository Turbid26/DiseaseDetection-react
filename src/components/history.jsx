import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState(null);  // Change to null instead of an empty object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user history on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError('');
        const username = localStorage.getItem('username');
        if (!username) {
          setError('You are not registered.');
          setLoading(false);
          return;
        }
        // Add a timestamp to prevent caching
        const response = await axios.get(`./api/history?${new Date().getTime()}`);
        setHistory(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);  // Only run on mount

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

  if (!history) {
    return <div>No history found.</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Your Upload History</h1>
      <ul style={styles.list}>
        <li key={history._id} style={styles.item}>
          <div>
            <img src={history.url} alt="Uploaded" style={styles.image} />
          </div>
          <div>
            <p><strong>Diagnosis:</strong> {history.diagnosis}</p>
            <p><strong>Accuracy:</strong> {history.accuracy}%</p>
            <p><strong>Uploaded At:</strong> {new Date(history.uploadedAt).toLocaleString()}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default History;
