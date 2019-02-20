import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavItems.css';

const navItems = [
  { id: 'feed', text: 'Feed', link: '/', auth: true },
  { id: 'login', text: 'Login', link: '/', auth: false },
  { id: 'signup', text: 'Signup', link: '/signup', auth: false }
];

const NavItems = props => [
  ...navItems
    .filter(item => item.auth === props.isAuth)
    .map(item => (
      <li className='navigation-item' key={item.id}>
        <NavLink to={item.link} exact>
          {item.text}
        </NavLink>
      </li>
    )),
  props.isAuth && (
    <li className='navigation-item' key='logout'>
      <button onClick={props.onLogout}>Logout</button>
    </li>
  )
];

export default NavItems;
