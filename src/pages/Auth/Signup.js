import React, { Component, Fragment } from 'react';
import { FormValidation } from 'calidation';

import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import './Auth.css';

const formConfig = {
  name: {
    isRequired: 'Your name is required'
  },
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
    marginTop: theme.spacing.unit * 20,
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

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  onSubmitSignup = ({ errors, fields, isValid }) => {
    if (isValid) {
      const { name, email, password } = this.state;
      this.props.onSignup(name, email, password);
    } else {
      this.props.catchError(
        new Error('Please check your information and try again.')
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AssignmentOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <FormValidation
            config={formConfig}
            onSubmit={this.onSubmitSignup}
            className={classes.form}
          >
            {({ errors, submitted }) => (
              <Fragment>
                <FormControl margin='normal' required fullWidth>
                  <InputLabel htmlFor='name'>Name</InputLabel>
                  <Input
                    id='name'
                    name='name'
                    autoComplete='name'
                    autoFocus
                    disabled={this.props.loading}
                    onChange={this.onNameChange}
                  />
                  {submitted && errors.name && (
                    <p className='error'>{errors.name}</p>
                  )}
                </FormControl>
                <FormControl margin='normal' required fullWidth>
                  <InputLabel htmlFor='email'>Email Address</InputLabel>
                  <Input
                    id='email'
                    name='email'
                    autoComplete='email'
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
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  disabled={this.props.loading}
                >
                  {this.props.loading ? 'Loading...' : 'Sign up'}
                </Button>
              </Fragment>
            )}
          </FormValidation>
        </Paper>
      </main>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
