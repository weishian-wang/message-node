import React from 'react';
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
    flexGrow: 1,
    paddingLeft: '0.5rem'
  },
  navBtns: {
    paddingRight: '0.5rem'
  }
};

const TopAppBar = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h5' color='inherit' className={classes.grow}>
            Message Node
          </Typography>
          <div className={classes.navBtns}>{props.children}</div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

TopAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopAppBar);
