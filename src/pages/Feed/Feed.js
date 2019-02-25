import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';

import StatusForm from '../../components/StatusForm/StatusForm';
import Post from '../../components/Feed/Post/Post';
import FeedEdit from '../../components/Feed/FeedEdit/FeedEdit';
import './Feed.css';

const dummyPosts = [
  {
    _id: '101',
    creator: {
      name: 'tester'
    },
    createdAt: new Date(),
    title: 'Lizard',
    content: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    imageUrl: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
  },
  {
    _id: '102',
    creator: {
      name: 'tester'
    },
    createdAt: new Date(),
    title: 'Lizard',
    content: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    imageUrl: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
  },
  {
    _id: '103',
    creator: {
      name: 'tester'
    },
    createdAt: new Date(),
    title: 'Lizard',
    content: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    imageUrl: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
  },
  {
    _id: '104',
    creator: {
      name: 'tester'
    },
    createdAt: new Date(),
    title: 'Lizard',
    content: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    imageUrl: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
  },
  {
    _id: '105',
    creator: {
      name: 'tester'
    },
    createdAt: new Date(),
    title: 'Lizard',
    content: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    imageUrl: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
  },
  {
    _id: '106',
    creator: {
      name: 'tester'
    },
    createdAt: new Date(),
    title: 'Lizard',
    content: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    imageUrl: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
  },
];

class Feed extends Component {
  state = {
    status: '',
    posts: dummyPosts,
    isEditing: false,
    editPost: null
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

  cancelEditHandler = () => {
    this.setState({ isEditing: false, editPost: null });
  };

  finishEditHandler = (postData) => {
    console.log('Your post data has been received!');
    console.log(postData);
  };

  render() {
    return (
      <Fragment>
        <FeedEdit
          editing={this.state.isEditing}
          onCancelEdit={this.cancelEditHandler}
          onFinishEdit={this.finishEditHandler}
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
