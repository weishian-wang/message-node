import React from 'react';

import Logo from '../../Logo/Logo';
import NavItems from '../../NavItems/NavItems';
import './MainNav.css';

const MainNav = props => (
  <nav className='main-nav'>
    <div className='main-nav__logo'>
      <Logo />
    </div>
    <div className='spacer' />
    <ul className='main-nav__items'>
      <NavItems isAuth={props.isAuth} onLogout={props.onLogout} />
    </ul>
  </nav>
);

export default MainNav;
