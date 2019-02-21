import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import TopAppBar from './components/TopAppBar/TopAppBar';
import NavButtons from './components/NavButtons/NavButtons';
import SignInPage from './pages/Auth/SignIn';
import './App.css';

class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false
  };

  signoutHandler = () => {
    this.setState({ isAuth: false, token: null });
  };

  signinHandler = (email, password) => {
    console.log('email:', email);
    console.log('password:', password);
    console.log('You have signed in!');
    this.setState({ isAuth: true });
  };

  signupHandler = () => {};

  render() {
    let routes = (
      <Switch>
        <Route
          path='/'
          exact
          render={props => <SignInPage onSignin={this.signinHandler} />}
        />
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
          <NavButtons
            isAuth={this.state.isAuth}
            onSignout={this.signoutHandler}
          />
        </TopAppBar>
        {routes}
      </Fragment>
    );
  }
}

export default withRouter(App);
