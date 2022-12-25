import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // Довелось прибрати строгий режим, бо при ньому сповіщення тостіфай виводяться
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
