import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// 라우터
import { BrowserRouter } from 'react-router-dom';

// 프로바이더
import { Provider } from 'react-redux';
// 연결할 스토어
import store from "./redux/configStore";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

