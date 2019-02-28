import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

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

    fetch(`${process.env.REACT_APP_DOMAIN}feed/posts`)
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

    let url = `${process.env.REACT_APP_DOMAIN}feed/post`;
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
        const post = {
          _id: resData.post._id,
          title: resData.post.title,
          imageUrl: resData.post.imageUrl,
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

  deletePostHandler = postId => {
    this.setState({ postsLoading: true });
    fetch('URL')
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Unable to delete this post.');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState(prevState => {
          const updatedPosts = prevState.posts.filter(p => p._id !== postId);
          return { posts: updatedPosts, postsLoading: false };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ postsLoading: false });
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
        <Grid container justify='center' className='feed-control'>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={this.newPostHandler}
            >
              <AddIcon />
              New Post
            </Button>
          </Grid>
        </Grid>
        <section className='feed'>
          {this.state.posts.map(post => (
            <Post
              key={post._id}
              id={post._id}
              author={post.creator.name}
              date={new Date(post.createdAt).toLocaleDateString('en-US')}
              title={post.title}
              image={`${process.env.REACT_APP_DOMAIN}${post.imageUrl}`}
              content={post.content}
              onDelete={this.deletePostHandler.bind(this, post._id)}
            />
          ))}
        </section>
      </Fragment>
    );
  }
}

export default Feed;
