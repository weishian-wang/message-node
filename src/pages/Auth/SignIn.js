import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { FormValidation } from 'calidation';

import './Auth.css';

const formConfig = {
  email: {
    isRequired: 'Email address is required',
    isEmail: 'Please enter a valid email'
  },
  password: {
    isRequired: 'Password is also required',
    isMinLength: {
      message: 'Password must at least be 8 characters long',
      length: 8
    }
  }
};

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class Signin extends Component {
  state = {
    email: localStorage.getItem('userEmail') || '',
    password: '',
    remember: false
  };

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  onCheckboxChange = e => {
    this.setState({ remember: e.target.checked });
  };

  onSubmitSignin = ({ errors, fields, isValid }) => {
    if (isValid) {
      const { email, password, remember } = this.state;
      this.props.onSignin(email, password, remember);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <FormValidation
            config={formConfig}
            initialValues={{ email: this.state.email }}
            onSubmit={this.onSubmitSignin}
            className={classes.form}
          >
            {({ errors, submitted }) => (
              <Fragment>
                <FormControl margin='normal' required fullWidth>
                  <InputLabel htmlFor='email'>Email Address</InputLabel>
                  <Input
                    autoFocus
                    id='email'
                    name='email'
                    autoComplete='email'
                    value={this.state.email}
                    disabled={this.props.loading}
                    onChange={this.onEmailChange}
                  />
                  {submitted && errors.email && (
                    <p className='error'>{errors.email}</p>
                  )}
                </FormControl>
                <FormControl margin='normal' required fullWidth>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <Input
                    name='password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    disabled={this.props.loading}
                    onChange={this.onPasswordChange}
                  />
                  {submitted && errors.password && (
                    <p className='error'>{errors.password}</p>
                  )}
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      value='remember'
                      color='primary'
                      defaultChecked={this.state.remember}
                      disabled={this.props.loading}
                      onChange={this.onCheckboxChange}
                    />
                  }
                  label='Remember me'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  disabled={this.props.loading}
                >
                  {this.props.loading ? 'Loading...' : 'Sign in'}
                </Button>
              </Fragment>
            )}
          </FormValidation>
        </Paper>
      </main>
    );
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signin);
