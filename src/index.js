import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from 'styled-components';
import theme from 'ui-nature/dist/theme';
import 'ui-nature/dist/main.css';

import App from './App';
import { userActions } from "./redux/actions";
import store from "./redux/store";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const SSOToken = urlParams.get('SSOToken');
window.SSOToken = SSOToken;
if(window.SSOToken){
  store.dispatch(userActions.fetchUserLogin())
}else{
  store.dispatch(userActions.refresh())
}

ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);