import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import VerticalMoreButton from './verticalMoreButton';

import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Post({post}) {
  const classes = useStyles();
  
  const [postInfo, setPostInfo] = useState(post);

  useEffect(()=> {
    console.log('post info changed');
  },[postInfo]);
  
  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.author}
          </Avatar>
        }
        action={
          <VerticalMoreButton post={post} postInfo={postInfo} setPostInfo={setPostInfo}/>
        }
        title={post.title}
        subheader={post.date}
      />

      <CardMedia className={classes.media} image={post.image} />
      

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
      </CardActions>
      <Divider />
      <FormControl fullWidth >
        <InputLabel htmlFor='comment'>comments on the post</InputLabel>
        <Input 
          id='comment'
          //value should be made later
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
              aria-label='comment button'>
              <SendIcon/>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Card>
  );
}
