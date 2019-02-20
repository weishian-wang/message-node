import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Toolbar from './components/Toolbar/Toolbar';
import MainNav from './components/Navigation/MainNav/MainNav';
import './App.css';

class App extends Component {
  state = {
    isAuth: true,
    token: null
  };

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
  };

  loginHandler = () => {};

  signupHandler = () => {};

  render() {
    let routes = (
      <Switch>
        <Route path='/' exact />
        <Route path='/signup' exact />
        <Redirect to='/' />
      </Switch>
    );

    if (this.state.isAuth) {
      routes = (
        <Switch>
          <Route path='/' exact />
          <Route path='/:postId' />
          <Redirect to='/' />
        </Switch>
      );
    }

    return (
      <Fragment>
        <Layout
          header={
            <Toolbar>
              <MainNav
                isAuth={this.state.isAuth}
                onLogout={this.logoutHandler}
              />
            </Toolbar>
          }
        />
        {routes}
      </Fragment>
    );
  }
}

export default withRouter(App);
