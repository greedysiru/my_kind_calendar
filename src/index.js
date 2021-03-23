import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// 라우터
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

