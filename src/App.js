import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import TopAppBar from './components/TopAppBar/TopAppBar';
import NavButtons from './components/NavButtons/NavButtons';
import SigninPage from './pages/Auth/Signin';
import SignupPage from './pages/Auth/Signup';
import FeedPage from './pages/Feed/Feed';
import SinglePostPage from './pages/Feed/SinglePost/SinglePost';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import './App.css';

class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.signoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    this.setState({ isAuth: true, token: token, userId: userId });
  }

  signoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  signinHandler = (email, password) => {
    this.setState({ authLoading: true });
    fetch(`${process.env.REACT_APP_DOMAIN}auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Could not authenticate you!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          isAuth: true,
          token: resData.token,
          userId: resData.userId,
          authLoading: false
        });
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
        const remainingMilliseconds = 1000 * 60 * 60;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };

  signupHandler = (name, email, password) => {
    this.setState({ authLoading: true });
    fetch(`${process.env.REACT_APP_DOMAIN}auth/signup`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Email address has been used.');
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Unable to sign up.');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ isAuth: false, authLoading: false });
        this.props.history.replace('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  catchError = error => {
    this.setState({ error: error });
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
              catchError={this.catchError}
            />
          )}
        />
        <Redirect to='/' />
      </Switch>
    );

    if (this.state.isAuth) {
      routes = (
        <Switch>
          <Route
            path='/'
            exact
            render={props => (
              <FeedPage
                {...props}
                userId={this.state.userId}
                token={this.state.token}
              />
            )}
          />
          <Route
            path='/:postId'
            render={props => (
              <SinglePostPage
                {...props}
                userId={this.state.userId}
                token={this.state.token}
                catchError={this.catchError}
              />
            )}
          />
          <Redirect to='/' />
        </Switch>
      );
    }

    return (
      <Fragment>
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
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
