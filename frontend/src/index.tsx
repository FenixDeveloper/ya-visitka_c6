import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./fonts/fonts.css";
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './AppContext ';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
