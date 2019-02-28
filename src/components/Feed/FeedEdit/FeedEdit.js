import React, { Component, Fragment } from 'react';

import NewPostHandler from '../NewPostHandler/NewPostHandler';

class FeedEdit extends Component {
  state = {};

  render() {
    return this.props.editing ? (
      <Fragment>
        <NewPostHandler
          editing={this.props.editing}
          selectedPost={this.props.selectedPost}
          onCancelEdit={this.props.onCancelEdit}
          onFinishEdit={this.props.onFinishEdit}
        />
      </Fragment>
    ) : null;
  }
}

export default FeedEdit;
