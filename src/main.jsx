import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const originalError = console.error;
console.error = (...args) => {
  if (args.length > 0 &&
    typeof args[0] === 'string' &&
    (
      args[0].includes('UNSAFE_componentWillMount') ||
      args[0].includes('componentWillMount') ||
      args[0].includes('Helmet')
    )) {
    return;
  }
  originalError.apply(console, args);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);