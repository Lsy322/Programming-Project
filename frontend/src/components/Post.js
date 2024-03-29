import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Comments from "./comments/comments";
import CommentBox from "./comments/commentBox";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

import VerticalMoreButton from "./verticalMoreButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from "@material-ui/icons/Person";

import { useDispatch } from "react-redux";
import { createRepost, deletePost } from "../context/action/posts";
import { useAuth0 } from "@auth0/auth0-react";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Post({ post }) {
  const classes = useStyles();
  
  
  const [postInfo, setPostInfo] = useState(post);
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated, user } = useAuth0();

  const handleDeleteClick = () => {
    dispatch(deletePost(post._id, post.Type));
  };
  
  const handleProfileClick = () => {
    history.push(`/profile/${post.author.sub}`);
  }

  const handleRepostClick = () => {
    const repostInfo = {
      author: user,
      post_id: post._id,
    };
    dispatch(createRepost(repostInfo));
  }
  var time = new Date(post.createAt); //time Convertion
  var timeString = time.toString();


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={post.author.picture}
          />
        }
        action={
          isAuthenticated ? (
            <VerticalMoreButton
              post={post}
              postInfo={postInfo}
              setPostInfo={setPostInfo}
            />
          ) : null
        }
        title={post.title}
        subheader={"Posted at " + timeString + " by " + post.author.nickname}
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

        <IconButton aria-label="profile" onClick={handleProfileClick}>
          <PersonIcon />
        </IconButton>

        {/* REPOST ICON */}
        {isAuthenticated && !post.permission.viewPermission ? (
          <IconButton aria-label="share" onClick={handleRepostClick}>
            <ShareIcon />
          </IconButton>
        ) : null}

        {/* DELETE ICON */}
        {isAuthenticated && user.sub === post.author.sub ? (
          <IconButton aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        ) : null}
      </CardActions>
      <Divider />

      {/* COMMENT LIMITATION */}
      {isAuthenticated && post.permission.commentPermission ? (
        <CommentBox post={post} />
      ) : null}

      <Comments post={post} />
    </Card>
  );
}
