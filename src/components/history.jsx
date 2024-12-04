import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);  // Changed from null to an empty array
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
        const response = await axios.post('/api/history', {}, {
          headers: {
            'Authorization': `${username}` // Send the username in the header
          }
        });

        console.log('Response data:', response.data);  // Log the response data here
        
        // Ensure response.data is an array before setting it
        if (Array.isArray(response.data)) {
          setHistory(response.data);  // Set history only if it is an array
        } else {
          console.log('Data is not an array', response.data);  // Log if the response is not an array
          setHistory([]);  // Default to an empty array if data is not as expected
        }
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

  // Log current history state for debugging
  console.log('History State:', history);

  // Render logic
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  // Check if history is an array and has data
  if (!Array.isArray(history) || history.length === 0) {
    return <div>No history found.</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Your Upload History</h1>
      <ul style={styles.list}>
        {history.map(item => (  // Map through the history array
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
