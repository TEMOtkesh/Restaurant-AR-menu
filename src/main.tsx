import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    
    // Remove loader once React has started rendering
    const loader = document.getElementById('app-loader');
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }, 500);
    }
  } catch (error) {
    const loaderText = document.getElementById('loader-text');
    if (loaderText) {
      loaderText.innerText = 'Failed to start app. Please refresh.';
      loaderText.style.color = '#ff4444';
    }
    console.error('Mounting error:', error);
  }
}
