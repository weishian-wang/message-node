import React, { Component } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import './SinglePost.css';

class SinglePost extends Component {
  state = {
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    fetch('http://localhost:8080/feed/post/' + postId)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Unable to fetch this post.');
        }
        return res.json();
      })
      .then(resData => {
        const dateObj = new Date(resData.post.createdAt);
        const formattedDate =
          new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateObj) +
          ' ' +
          dateObj.getDate() +
          ', ' +
          dateObj.getFullYear() +
          ' at ' +
          dateObj.toLocaleTimeString();
        this.setState({
          title: resData.post.title,
          author: resData.post.creator,
          date: formattedDate,
          image: 'http://localhost:8080/' + resData.post.imageUrl,
          content: resData.post.content
        });
      })
      .catch(this.props.catchError);
  }

  render() {
    return (
      <section className='single-post'>
        <Typography variant='h6'>Posted by {this.state.author}</Typography>
        <Typography variant='subtitle2' style={{ color: 'grey' }}>
          {this.state.date}
        </Typography>
        <Divider />
        <div className='single-post__image'>
          {this.state.image && <CardMedia component='img' image={this.state.image} alt='' />}
        </div>
        <Typography variant='h4' gutterBottom>
          {this.state.title}
        </Typography>
        <Typography variant='body1'>{this.state.content}</Typography>
      </section>
    );
  }
}

export default SinglePost;
