import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Optional: import your main stylesheet
import App from './App'; // Import your main App component

// Render the App component into the root DOM element
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
