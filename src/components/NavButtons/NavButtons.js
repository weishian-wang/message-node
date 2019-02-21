import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import './NavButtons.css';

const navbuttons = [
  { id: 'feed', text: 'Feed', link: '/', auth: true },
  { id: 'login', text: 'Login', link: '/', auth: false },
  { id: 'signup', text: 'Signup', link: '/signup', auth: false }
];

const NavButtons = props => [
  ...navbuttons
    .filter(item => item.auth === props.isAuth)
    .map(item => (
      <Button key={item.id}>
        <NavLink to={item.link} exact>
          {item.text}
        </NavLink>
      </Button>
    )),
  props.isAuth && <Button key='logout' onClick={props.onLogout}>Logout</Button>
];

export default NavButtons;
