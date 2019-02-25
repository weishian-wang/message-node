import React, { Component, Fragment } from 'react';

import FormDialog from '../FormDialog/FormDialog';

class FeedEdit extends Component {
  state = {};

  render() {
    return this.props.editing ? (
      <Fragment>
        <FormDialog onClose={this.props.onClose}/>
      </Fragment>
    ) : null;
  }
}

export default FeedEdit;
