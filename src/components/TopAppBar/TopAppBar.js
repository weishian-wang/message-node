import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

const TopAppBar = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' color='inherit' className={classes.grow}>
            <NavLink to='/'>Message Node</NavLink>
          </Typography>
          {props.children}
        </Toolbar>
      </AppBar>
    </div>
  );
};

TopAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopAppBar);
