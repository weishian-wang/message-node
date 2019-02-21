import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import TopAppBar from './components/TopAppBar/TopAppBar';
import NavButtons from './components/NavButtons/NavButtons';
import SigninPage from './pages/Auth/Signin';
import SignupPage from './pages/Auth/Signup';
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
    this.setState({ authLoading: false });
  };

  signinHandler = (email, password) => {
    this.setState({ authLoading: true });
    console.log('email:', email);
    console.log('password:', password);
    console.log('You have signed in!');
    this.setState({ isAuth: true });
  };

  signupHandler = (name, email, password) => {
    this.setState({ isAuth: false });
    console.log('name:', name);
    console.log('email:', email);
    console.log('password:', password);
    console.log('You have signed up successfully!');
    this.props.history.replace('/');
  };

  render() {
    let routes = (
      <Switch>
        <Route
          path='/'
          exact
          render={props => (
            <SigninPage
              {...props}
              onSignin={this.signinHandler}
              loading={this.state.authLoading}
            />
          )}
        />
        <Route
          path='/signup'
          exact
          render={props => (
            <SignupPage
              {...props}
              onSignup={this.signupHandler}
              loading={this.state.authLoading}
            />
          )}
        />
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
