import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import { generateBase64FromImage } from '../../../util/image';
import { FormValidation } from 'calidation';

import './NewPostHandler.css';

const Transition = props => {
  return <Slide direction='down' {...props} />;
};

const formConfig = {
  title: {
    isRequired: 'Title is required',
    isMinLength: {
      message: 'Title must at least be 2 characters long',
      length: 2
    }
  },
  content: {
    isRequired: 'Content is required',
    isMinLength: {
      message: 'Content must at least be 5 characters long',
      length: 5
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

  componentDidMount() {
    if (this.props.editing && this.props.selectedPost) {
      const postForm = {
        title: this.props.selectedPost.title,
        image: this.props.selectedPost.imagePath,
        content: this.props.selectedPost.content
      };
      this.setState({ postForm: postForm });
    }
  }

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
      this.setState(initialState);
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
          TransitionComponent={Transition}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>New Post</DialogTitle>
          <Divider />
          <FormValidation
            initialValues={{
              title: this.state.postForm.title,
              content: this.state.postForm.content
            }}
            config={formConfig}
            onSubmit={this.onSubmitShare}
          >
            {({ fields, errors, submitted }) => (
              <Fragment>
                <DialogContent>
                  <TextField
                    autoFocus
                    value={this.state.postForm.title}
                    margin='normal'
                    id='title'
                    name='title'
                    label='Title'
                    type='text'
                    variant='outlined'
                    fullWidth
                    onChange={this.onTitleChange}
                    error={submitted && !!errors.title}
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
                    value={this.state.postForm.content}
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
                    error={submitted && !!errors.content}
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
