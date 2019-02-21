import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import TopAppBar from './components/TopAppBar/TopAppBar';
import NavButtons from './components/NavButtons/NavButtons';
import './App.css';

class App extends Component {
  state = {
    isAuth: true,
    token: null,
    userId: null
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
        <TopAppBar>
          <NavButtons isAuth={this.state.isAuth} onLogout={this.logoutHandler} />
        </TopAppBar>
        {routes}
      </Fragment>
    );
  }
}

export default withRouter(App);
