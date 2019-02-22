import React, { Component, Fragment } from 'react';

import FeedStatusForm from '../../components/FeedStatusForm/FeedStatusForm';

class Feed extends Component {
  state = {
    status: 'Your Status'
  };

  statusInputChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ status: event.target.value });
  };
  
  statusUpdateHandler = event => {
    console.log('You have updated your status!');
    event.preventDefault();
  };

  render() {
    return (
      <Fragment>
        <FeedStatusForm
          status={this.state.status}
          onStatusChange={this.statusInputChangeHandler}
          onStatusSubmit={this.statusUpdateHandler}
        />
      </Fragment>
    );
  }
}

export default Feed;
