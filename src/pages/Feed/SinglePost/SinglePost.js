import React, { Component } from 'react';
import CardMedia from '@material-ui/core/CardMedia';

import './SinglePost.css';

const options = { month: 'long' };

class SinglePost extends Component {
  state = {
    title: 'Lizard',
    author: 'tester',
    // date: new Date().toLocaleDateString('en-US'),
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
        <h4>Posted by {this.state.author}</h4>
        <h6>{this.state.date}</h6>
        <div className='single-post__image'>
          <h1>{this.state.title}</h1>
          <CardMedia
            component='img'
            alt='Contemplative Reptile'
            image={this.state.image}
            title='Contemplative Reptile'
          />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default SinglePost;
