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
import teal from '@material-ui/core/colors/teal';

const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(550 + theme.spacing.unit * 3 * 2)]: {
      width: 550,
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
    primary: teal
  },
  typography: { useNextVariants: true }
});

const StatusForm = props => {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <form className={classes.form} onSubmit={props.onStatusSubmit}>
          <FormControl className={classes.formControl} margin='normal'>
            <TextField
              label='Your status'
              value={props.status}
              variant='outlined'
              className={classes.margin}
              onChange={props.onStatusChange}
            />
          </FormControl>
          <Button type='submit' color='primary' className={classes.submit}>
            Update
          </Button>
        </form>
      </MuiThemeProvider>
    </section>
  );
};

StatusForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StatusForm);
