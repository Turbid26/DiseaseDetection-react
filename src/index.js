import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css'; // Optional: import your main stylesheet
import App from './App'; // Import your main App component

// Create a root container
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root container
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
