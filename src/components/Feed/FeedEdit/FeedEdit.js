import React, { Component, Fragment } from 'react';

import FormDialog from '../FormDialog/FormDialog';

class FeedEdit extends Component {
  state = {};

  render() {
    return this.props.editing ? (
      <Fragment>
        <FormDialog
          onCancelEdit={this.props.onCancelEdit}
          onFinishEdit={this.props.onFinishEdit}
        />
      </Fragment>
    ) : null;
  }
}

export default FeedEdit;
