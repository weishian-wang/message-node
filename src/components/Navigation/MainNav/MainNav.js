import React from 'react';

import Logo from '../../Logo/Logo';
import './MainNav.css';

const MainNav = props => {
  return (
    <nav className="main-nav">
      <div className="main-nav__logo">
        <Logo />
      </div>
    </nav>
  );
};

export default MainNav;
