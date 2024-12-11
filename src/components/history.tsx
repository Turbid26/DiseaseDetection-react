import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface DiagnosisHistory {
  id: string;
  diagnosis: string;
  accuracy: number;
  uploadedAt: string;
  url: string;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<DiagnosisHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError('');

        const username = localStorage.getItem('username');
        if (!username) {
          setError('You are not logged in!');
          return;
        }

        const response = await axios.post('/api/history', {}, {
          headers: {
            Authorization: username,
          },
        });

        console.log('Response received from backend: ', response.data);

        if (Array.isArray(response.data)) {
          setHistory(response.data);
        } else {
          console.error('Unexpected data format');
        }
      } catch (error) {
        setError('Failed to fetch your history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ position: 'relative', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Your Diagnosis History</h1>
      {history.length === 0 ? (
        <div>No history found.</div>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {history.map((item) => (
            <li
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '15px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={item.url}
                  alt={item.diagnosis}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginRight: '10px',
                  }}
                />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>{item.diagnosis}</p>
                  <p style={{ color: 'gray', fontSize: '14px', margin: 0 }}>
                    {new Date(item.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div style={{ color: 'green', fontWeight: 'bold' }}>
                {`${Math.round(item.accuracy - 1)}% confidence`}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
