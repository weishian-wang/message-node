import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

import StatusForm from '../../components/StatusForm/StatusForm';
import Post from '../../components/Feed/Post/Post';
import FeedEdit from '../../components/Feed/FeedEdit/FeedEdit';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import Paginations from '../../components/Paginations/Paginations';
import Loader from '../../components/Loader/Loader';
import './Feed.css';

class Feed extends Component {
  state = {
    status: '',
    posts: [],
    isEditing: false,
    editPost: null,
    postsLoading: false,
    editLoading: false,
    error: null,
    totalPosts: 0,
    currentPage: 1,
    pages: [],
    postPerPage: 1
  };

  componentDidMount() {
    fetch(`${process.env.REACT_APP_DOMAIN}feed/status`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    })
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
    this.setState({ postsLoading: true });

    let page = this.state.currentPage;
    if (direction) {
      const lastPage = Math.ceil(
        this.state.totalPosts / this.state.postPerPage
      );
      if (direction === 'next') {
        page++;
        if (page > lastPage) return;
        this.setState({ currentPage: page });
      }
      if (direction === 'previous') {
        page--;
        if (page <= 0) return;
        this.setState({ currentPage: page });
      }
    }

    fetch(`${process.env.REACT_APP_DOMAIN}feed/posts?page=${page}`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Unable to fetch posts.');
        }
        return res.json();
      })
      .then(resData => {
        this.setState(
          {
            posts: resData.posts,
            totalPosts: resData.totalItems,
            postPerPage: resData.POST_PER_PAGE,
            postsLoading: false
          },
          () =>
            this.calculatePaginations(
              this.state.totalPosts,
              this.state.currentPage,
              this.state.postPerPage
            )
        );
      })
      .catch(this.catchError);
  };

  calculatePaginations = (totalPosts, currentPage, postPerPage) => {
    if (totalPosts >= 1) {
      const pages = [];
      const lastPage = Math.ceil(totalPosts / postPerPage);
      for (let i = 0; i < lastPage + 2; i++) {
        if (i === 0) {
          pages.push({
            text: 'PREV',
            onClick: this.loadPosts.bind(this, 'previous')
          });
          continue;
        }
        if (i === lastPage + 1) {
          pages.push({
            text: 'NEXT',
            onClick: this.loadPosts.bind(this, 'next')
          });
          continue;
        }
        pages.push({
          text: i,
          active: i === currentPage,
          onClick: this.changePage.bind(this, i)
        });
      }
      this.setState({ pages: pages });
    }
  };

  changePage = page => {
    this.setState({ currentPage: page }, () => this.loadPosts());
  };

  statusChangeHandler = event => {
    this.setState({ status: event.target.value });
  };

  statusUpdateHandler = event => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_DOMAIN}feed/status`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this.props.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: this.state.status
      })
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Unable to update your status.');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(this.catchError);
  };

  newPostHandler = () => {
    this.setState({ isEditing: true });
  };

  cancelEditHandler = () => {
    this.setState({ isEditing: false, editPost: null });
  };

  startEditPostHandler = postId => {
    this.setState(prevState => {
      const loadedPost = { ...prevState.posts.find(p => p._id === postId) };

      return {
        isEditing: true,
        editPost: loadedPost
      };
    });
  };

  finishEditHandler = postData => {
    this.setState({ editLoading: true });

    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('image', postData.image);

    let url = `${process.env.REACT_APP_DOMAIN}feed/post`;
    let method = 'POST';
    if (this.state.editPost) {
      url = `${process.env.REACT_APP_DOMAIN}feed/post/${
        this.state.editPost._id
      }`;
      method = 'PUT';
    }

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${this.props.token}`
      },
      body: formData
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
          creator: resData.creator,
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
            if (prevState.posts.length >= this.state.postPerPage) {
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

    fetch(`${process.env.REACT_APP_DOMAIN}feed/post/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Unable to delete this post.');
        }
        return res.json();
      })
      .then(resData => {
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
    const { postsLoading, posts } = this.state;
    return (
      <Fragment>
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
        <FeedEdit
          editing={this.state.isEditing}
          selectedPost={this.state.editPost}
          onCancelEdit={this.cancelEditHandler}
          onFinishEdit={this.finishEditHandler}
        />
        <StatusForm
          status={this.state.status}
          onStatusChange={this.statusChangeHandler}
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
          <Grid container justify='center'>
            <Grid item>
              {postsLoading && <Loader />}
              {!postsLoading && posts.length <= 0 && (
                <Typography variant='h5'>No posts found</Typography>
              )}
            </Grid>
          </Grid>
          {!postsLoading &&
            posts.map(post => (
              <Post
                key={post._id}
                id={post._id}
                author={post.creator.name}
                isAuthor={post.creator._id === this.props.userId}
                date={new Date(post.createdAt).toLocaleDateString('en-US')}
                title={post.title}
                image={`${process.env.REACT_APP_DOMAIN}${post.imageUrl}`}
                content={post.content}
                onDelete={this.deletePostHandler.bind(this, post._id)}
                onStartEdit={this.startEditPostHandler.bind(this, post._id)}
              />
            ))}
        </section>
        <Grid container justify='center'>
          <Grid item>
            {!postsLoading && posts.length >= 1 && (
              <Paginations pages={this.state.pages} color='info' />
            )}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default Feed;
