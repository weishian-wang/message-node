import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';

import FeedStatusForm from '../../components/FeedStatusForm/FeedStatusForm';
import './Feed.css';

class Feed extends Component {
  state = {
    status: 'Your Status',
    isEditing: false
  };

  statusInputChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ status: event.target.value });
  };

  statusUpdateHandler = event => {
    console.log('You have updated your status!');
    event.preventDefault();
  };

  newPostHandler = () => {
    console.log('You just added a new post!');
    this.setState({ isEditing: true });
  };

  render() {
    return (
      <Fragment>
        <FeedStatusForm
          status={this.state.status}
          onStatusChange={this.statusInputChangeHandler}
          onStatusSubmit={this.statusUpdateHandler}
        />
        <section className='feed-control'>
          <Button
            variant='contained'
            color='primary'
            onClick={this.newPostHandler}
          >
            New Post
          </Button>
        </section>
      </Fragment>
    );
  }
}

export default Feed;
