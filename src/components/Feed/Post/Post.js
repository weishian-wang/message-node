import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import cyan from '@material-ui/core/colors/cyan';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  card: {
    maxWidth: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '1rem'
  },
  avatar: {
    backgroundColor: cyan[500]
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

const Post = props => {
  const { classes, isAuthor } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label='Post' className={classes.avatar}>
            {props.author[0]}
          </Avatar>
        }
        title={props.title}
        subheader={props.date}
      />
      <CardMedia className={classes.media} image={props.image} alt='' />
      <CardContent>
        <Typography component='p'>{props.content}</Typography>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <Button size='small' color='primary'>
          <Link to={props.id}>See More</Link>
        </Button>
        {isAuthor ? (
          <Button size='small' color='primary' onClick={props.onStartEdit}>
            Edit
          </Button>
        ) : null}
        {isAuthor ? (
          <Button size='small' color='secondary' onClick={props.onDelete}>
            Delete
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

Post.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
