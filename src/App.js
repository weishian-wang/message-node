import React, { Component, Fragment } from 'react';

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

  render() {
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
      </Fragment>
    );
  }
}

export default App;
