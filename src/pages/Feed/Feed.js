import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';

import StatusForm from '../../components/StatusForm/StatusForm';
import Post from '../../components/Feed/Post/Post';
import FeedEdit from '../../components/Feed/FeedEdit/FeedEdit';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import './Feed.css';

class Feed extends Component {
  state = {
    status: '',
    posts: [],
    isEditing: false,
    editPost: null,
    postsLoading: false,
    editLoading: false,
    error: null
  };

  componentDidMount() {
    fetch('URL')
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Unable to fetch user status.');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ status: resData.status });
      })
      .catch(this.catchError);

    this.loadPosts();
  }

  loadPosts = direction => {
    // if (direction) {
    //   this.setState({ postsLoading: true, posts: [] });
    // }
    // let page = this.state.postPage;
    // if (direction === 'next') {
    //   page++;
    //   this.setState({ postPage: page });
    // }
    // if (direction === 'previous') {
    //   page--;
    //   this.setState({ postPage: page });
    // }

    fetch('http://localhost:8080/feed/posts')
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Unable to fetch posts.');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          posts: resData.posts,
          totalPosts: resData.totalItems,
          postsLoading: false
        });
      })
      .catch(this.catchError);
  };

  statusInputChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ status: event.target.value });
  };

  statusUpdateHandler = event => {
    console.log('You have updated your status!');
    event.preventDefault();
    // fetch('URL')
    //   .then(res => {
    //     if (res.status !== 200 && res.status !== 201) {
    //       throw new Error('Unable to update status!');
    //     }
    //     return res.json();
    //   })
    //   .then(resData => {
    //     console.log(resData);
    //   })
    //   .catch(this.catchError);
  };

  newPostHandler = () => {
    this.setState({ isEditing: true });
  };

  cancelEditHandler = () => {
    this.setState({ isEditing: false, editPost: null });
  };

  finishEditHandler = postData => {
    console.log('Your post data has been received!');
    console.log(postData);
    this.setState({
      editLoading: true
    });

    let url = 'http://localhost:8080/feed/post';
    let method = 'POST';
    if (this.state.editPost) {
      url = 'URL';
      method = 'PATCH';
    }

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: postData.title,
        image: postData.image,
        content: postData.content
      })
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating or editing a post failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        const post = {
          _id: resData.post._id,
          title: resData.post.title,
          content: resData.post.content,
          creator: resData.post.creator,
          createdAt: resData.post.createdAt
        };

        this.setState(prevState => {
          let updatedPosts = [...prevState.posts];
          let updatedTotalPosts = prevState.totalPosts;
          if (prevState.editPost) {
            const postIndex = prevState.posts.findIndex(p => {
              return p._id === prevState.editPost._id;
            });
            updatedPosts[postIndex] = post;
          } else {
            updatedTotalPosts++;
            if (prevState.posts.length >= 2) {
              updatedPosts.pop();
            }
            updatedPosts.unshift(post);
          }
          return {
            posts: updatedPosts,
            totalPosts: updatedTotalPosts,
            isEditing: false,
            editPost: null,
            editLoading: false
          };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isEditing: false,
          editPost: null,
          editLoading: false,
          error: err
        });
      });
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  catchError = error => {
    this.setState({ error: error });
  };

  render() {
    return (
      <Fragment>
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
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
