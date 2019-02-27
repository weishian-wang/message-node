import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const ErrorHandler = props => {
  const { fullScreen, error, onHandle } = props;

  return (
    error && (
      <div>
        <Dialog
          fullScreen={fullScreen}
          fullWidth
          open={true}
          onClose={onHandle}
          aria-labelledby='responsive-dialog-title'
        >
          <DialogTitle id='responsive-dialog-title'>
            {'An Error Occurred'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{error.message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onHandle} color='primary' autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  );
};

ErrorHandler.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(ErrorHandler);
