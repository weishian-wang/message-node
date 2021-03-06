import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const navbuttons = [
  { id: 'feed', text: 'Feed', link: '/', auth: true },
  { id: 'signin', text: 'Sign In', link: '/', auth: false },
  { id: 'signup', text: 'Sign Up', link: '/signup', auth: false }
];

const NavButtons = props => [
  props.isAuth && (props.userEmail),
  ...navbuttons
    .filter(item => item.auth === props.isAuth)
    .map(item => (
      <Button key={item.id}>
        <NavLink to={item.link} exact activeStyle={{ color: 'orange' }}>
          {item.text}
        </NavLink>
      </Button>
    )),
  props.isAuth && (
    <Button key='signout' onClick={props.onSignout}>
      Sign Out
    </Button>
  )
];

export default NavButtons;
