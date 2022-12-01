import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CalendarApp } from './CalendarApp';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <CalendarApp />
    <ToastContainer />
    {/* </React.StrictMode> */}
  </BrowserRouter>
)
