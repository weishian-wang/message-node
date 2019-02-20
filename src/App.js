import React, { Component, Fragment } from 'react';

import Layout from './components/Layout/Layout';
import Toolbar from './components/Toolbar/Toolbar';
import MainNav from './components/Navigation/MainNav/MainNav';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Layout
          header={
            <Toolbar>
              <MainNav />
            </Toolbar>
          }
        />
      </Fragment>
    );
  }
}

export default App;
