import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from 'react-router-dom'
import UserInfo from './Component/User/UserInfo';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import TagPool from './Component/Detail/TagPool';

ReactDOM.render(
  <HashRouter>
    <App />
    {/* <UserInfo/> */}
    {/* <TagPool/> */}
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
