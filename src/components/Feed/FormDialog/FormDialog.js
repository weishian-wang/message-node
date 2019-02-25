import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { generateBase64FromImage } from '../../../util/image';

import './FormDialog.css';

const initialState = {
  open: true,
  imagePreview: null,
  postForm: {
    title: '',
    image: '',
    content: ''
  }
};

class FormDialog extends Component {
  state = initialState;

  onClickOpenHandler = () => {
    this.setState({ open: true });
  };

  onCloseHandler = () => {
    this.setState(initialState);
    this.props.onClose();
  };

  onTitleChange = e => {
    this.setState(Object.assign(this.state.postForm, { title: e.target.value }));
  };

  onImageChange = files => {
    if (files && files[0]) {
      console.log(files[0]);
      generateBase64FromImage(files[0])
        .then(b64 => {
          this.setState({ imagePreview: b64 });
        })
        .catch(e => {
          this.setState({ imagePreview: null });
        });
    }
  };

  onContentChange = e => {
    this.setState(Object.assign(this.state.postForm, { content: e.target.value }));
  };

  onSubmitShare = event => {
    event.preventDefault();
    console.log('Form:', this.state.postForm);
    this.onCloseHandler();
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.onCloseHandler}
          onBackdropClick={this.onCloseHandler}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>New Post</DialogTitle>
          <form>
            <DialogContent>
              <DialogContentText />
              <TextField
                autoFocus
                margin='normal'
                id='title'
                label='Title'
                type='text'
                variant='outlined'
                fullWidth
                onChange={this.onTitleChange}
              />
              <Button color='primary' component='label'>
                <input
                  id='image'
                  type='file'
                  onChange={e => this.onImageChange(e.target.files)}
                />
              </Button>
              <div className='new-post__preview-image'>
                {!this.state.imagePreview && <p>Please select an image</p>}
                {this.state.imagePreview && (<img className='thumbnail' src={this.state.imagePreview} alt='' />)}
              </div>
              <TextField
                margin='normal'
                id='content'
                label='Content'
                type='text'
                variant='outlined'
                fullWidth
                multiline
                rows='4'
                onChange={this.onContentChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onCloseHandler} color='secondary'>
                Cancel
              </Button>
              <Button onClick={this.onSubmitShare} color='primary'>
                Share
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default FormDialog;
