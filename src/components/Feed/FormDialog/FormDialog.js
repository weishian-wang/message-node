import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { generateBase64FromImage } from '../../../util/image';
import { FormValidation } from 'calidation';

import './FormDialog.css';

const formConfig = {
  title: {
    isRequired: 'Title is required'
  },
  image: {
    isRequired: 'Image is required'
  },
  content: {
    isRequired: 'Content is required',
    isMinLength: {
      message: 'Content must at least be 2 characters long',
      length: 2
    }
  }
};

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
    this.props.onCancelEdit();
  };

  onTitleChange = e => {
    this.setState(
      Object.assign(this.state.postForm, { title: e.target.value })
    );
  };

  onImageChange = files => {
    if (files && files[0]) {
      if (files[0].type === 'image/png' || files[0].type === 'image/jpeg') {
        generateBase64FromImage(files[0])
          .then(b64 => {
            this.setState({ imagePreview: b64 });
            this.setState(
              Object.assign(this.state.postForm, { image: files[0] })
            );
          })
          .catch(e => {
            this.setState({ imagePreview: null });
          });
      }
    }
  };

  onContentChange = e => {
    this.setState(
      Object.assign(this.state.postForm, { content: e.target.value })
    );
  };

  onSubmitShare = ({ errors, fields, isValid }) => {
    if (isValid) {
      console.log('Valid');
      const post = {
        title: this.state.postForm.title,
        image: this.state.postForm.image,
        content: this.state.postForm.content
      };
      this.props.onFinishEdit(post);
      this.onCloseHandler();
    } else {
      console.log('Invalid');
    }
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.onCloseHandler}
          onBackdropClick={this.onCloseHandler}
          fullWidth
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>New Post</DialogTitle>
          <FormValidation config={formConfig} onSubmit={this.onSubmitShare}>
            {({ errors, submitted }) => (
              <Fragment>
                <DialogContent>
                  <DialogContentText />
                  <TextField
                    autoFocus
                    error={submitted && !!errors.title}
                    margin='normal'
                    id='title'
                    name='title'
                    label='Title'
                    type='text'
                    variant='outlined'
                    fullWidth
                    onChange={this.onTitleChange}
                  />
                  {submitted && errors.title && (
                    <p className='error'>{errors.title}</p>
                  )}
                  <Button color='primary' component='label'>
                    <input
                      id='image'
                      name='image'
                      type='file'
                      accept='image/png, image/jpeg'
                      onChange={e => this.onImageChange(e.target.files)}
                    />
                  </Button>
                  <div className='new-post__preview-image'>
                    {!this.state.imagePreview && <p>Please select an image</p>}
                    {this.state.imagePreview && (
                      <img
                        className='thumbnail'
                        src={this.state.imagePreview}
                        alt='preview'
                      />
                    )}
                  </div>
                  <TextField
                    error={submitted && !!errors.content}
                    margin='normal'
                    id='content'
                    name='content'
                    label='Content'
                    type='text'
                    variant='outlined'
                    fullWidth
                    multiline
                    rows='4'
                    onChange={this.onContentChange}
                  />
                  {submitted && errors.content && (
                    <p className='error'>{errors.content}</p>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.onCloseHandler} color='secondary'>
                    Cancel
                  </Button>
                  <Button type='submit' color='primary'>
                    Share
                  </Button>
                </DialogActions>
              </Fragment>
            )}
          </FormValidation>
        </Dialog>
      </div>
    );
  }
}

export default FormDialog;
