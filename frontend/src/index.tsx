import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./fonts/fonts.css";
import App from './components/app/app';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
       <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
