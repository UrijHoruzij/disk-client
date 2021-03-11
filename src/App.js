import React from 'react'
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { Main, Home } from "./pages";
import './App.scss';

const App = props => {
  const { isAuth } = props;
  return (
    <Switch>
        <Route
        path="/"
        render={() => (isAuth ? <Home/> : <Main/>)}
        />
    </Switch>
  );
}

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
