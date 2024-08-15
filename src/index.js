import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18 and newer
import App from './App'; // Import your main App component
import './index.css'; // Import global CSS styles

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
