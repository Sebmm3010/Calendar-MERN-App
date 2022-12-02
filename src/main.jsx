import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CalendarApp } from './CalendarApp';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    {/* <React.StrictMode> */}
    <CalendarApp />
    <ToastContainer />
    {/* </React.StrictMode> */}
  </HashRouter>
)
