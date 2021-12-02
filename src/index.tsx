import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "./Context/UserContext";
import ScrollToTop from "./customHooks/ScrollToTop";
import "./static/css/main.css";

ReactDOM.render(
  <React.StrictMode>
          <UserProvider>
              <BrowserRouter>
                  <ScrollToTop />
                  <App/>
              </BrowserRouter>
          </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


