import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  form: {
    display: 'flex',
    marginTop: theme.spacing.unit
  },
  formControl: {
    flex: 4
  },
  margin: {
    margin: theme.spacing.unit
  },
  submit: {
    flex: 1,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  typography: { useNextVariants: true }
});

const FeedStatusForm = props => {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <form className={classes.form} onSubmit={props.onStatusSubmit}>
          <FormControl className={classes.formControl} margin='normal'>
            <TextField
              placeholder={props.status}
              required
              variant='outlined'
              className={classes.margin}
              onChange={props.onStatusChange}
            />
          </FormControl>
          <Button
            type='submit'
            color='primary'
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </MuiThemeProvider>
    </section>
  );
};

FeedStatusForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FeedStatusForm);
