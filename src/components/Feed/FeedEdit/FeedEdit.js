import React, { Fragment } from 'react';

import NewPostHandler from '../NewPostHandler/NewPostHandler';

const FeedEdit = props => {
  return props.editing ? (
    <Fragment>
      <NewPostHandler
        editing={props.editing}
        selectedPost={props.selectedPost}
        onCancelEdit={props.onCancelEdit}
        onFinishEdit={props.onFinishEdit}
      />
    </Fragment>
  ) : null;
};

export default FeedEdit;
