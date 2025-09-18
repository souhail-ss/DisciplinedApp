import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import './styles/variables.css';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(
    (registration) => {
      console.log('Service Worker registered:', registration);
    },
    (error) => {
      console.log('Service Worker registration failed:', error);
    }
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);