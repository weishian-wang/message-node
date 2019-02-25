import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';

import StatusForm from '../../components/StatusForm/StatusForm';
import Post from '../../components/Feed/Post/Post';
import FeedEdit from '../../components/Feed/FeedEdit/FeedEdit';
import './Feed.css';

import dummyPosts from './dummyPosts';

class Feed extends Component {
  state = {
    status: '',
    posts: dummyPosts,
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
    this.setState({ isEditing: true });
  };

  closeDialogHandler = () => {
    this.setState({ isEditing: false });
  };

  render() {
    return (
      <Fragment>
        <FeedEdit
          editing={this.state.isEditing}
          onClose={this.closeDialogHandler}
        />
        <StatusForm
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
        <section className='feed'>
          {this.state.posts.map(post => (
            <Post
              key={post._id}
              id={post._id}
              author={post.creator.name}
              date={new Date(post.createdAt).toLocaleDateString('en-US')}
              title={post.title}
              image={post.imageUrl}
              content={post.content}
            />
          ))}
        </section>
      </Fragment>
    );
  }
}

export default Feed;
