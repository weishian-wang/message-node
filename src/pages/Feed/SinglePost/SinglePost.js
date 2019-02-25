import React, { Component } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import './SinglePost.css';

const options = { month: 'long' };

class SinglePost extends Component {
  state = {
    title: 'Lizard',
    author: 'tester',
    date:
      new Intl.DateTimeFormat('en-US', options).format(new Date()) +
      ' ' +
      new Date().getDate() +
      ', ' +
      new Date().getFullYear() +
      ' at ' +
      new Date().toLocaleTimeString(),
    image:
      'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    content:
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
  };

  render() {
    return (
      <section className='single-post'>
        <Typography variant='h6'>Posted by {this.state.author}</Typography>
        <Typography variant='subtitle2' style={{ color: 'grey' }}>
          {this.state.date}
        </Typography>
        <Divider />
        <div className='single-post__image'>
          <CardMedia component='img' image={this.state.image} alt='' />
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
