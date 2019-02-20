import React, { Fragment } from 'react';

import './Layout.css';

const Layout = props => {
  return (
    <Fragment>
      <header className='main-header'>{props.header}</header>
    </Fragment>
  );
};

export default Layout;
