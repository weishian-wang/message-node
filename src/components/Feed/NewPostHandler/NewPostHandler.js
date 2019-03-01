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

class FormDialog extends Component {
  state = {
    open: true,
    imagePreview: null,
    title: '',
    image: '',
    content: ''
  };

  componentDidMount() {
    if (this.props.editing && this.props.selectedPost) {
      this.setState({
        title: this.props.selectedPost.title,
        image: this.props.selectedPost.imagePath,
        content: this.props.selectedPost.content
      });
    }
  }

  onClickOpenHandler = () => {
    this.setState({ open: true });
  };

  onCloseHandler = () => {
    this.props.onCancelEdit();
  };

  onTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  onImageChange = files => {
    if (files && files[0]) {
      if (files[0].type === 'image/png' || files[0].type === 'image/jpeg') {
        generateBase64FromImage(files[0])
          .then(b64 => {
            this.setState({ imagePreview: b64, image: files[0] });
          })
          .catch(e => {
            this.setState({ imagePreview: null });
          });
      }
    }
  };

  onContentChange = e => {
    this.setState({ content: e.target.value });
  };

  onSubmitShare = ({ errors, fields, isValid }) => {
    if (isValid) {
      const post = {
        title: this.state.title,
        image: this.state.image,
        content: this.state.content
      };
      this.props.onFinishEdit(post);
      this.setState({
        imagePreview: null,
        title: '',
        image: '',
        content: ''
      });
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
            initialValues={{ title: '', content: '' }}
            config={formConfig}
            onSubmit={this.onSubmitShare}
          >
            {({ fields, errors, submitted }) => (
              <Fragment>
                <DialogContent>
                  <TextField
                    autoFocus
                    value={this.state.title}
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
                    value={this.state.content}
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
