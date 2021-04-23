import React from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { useAuth0 } from "@auth0/auth0-react";
import {useDispatch} from 'react-redux';
import { updatePost } from "../../context/action/posts";
export default function Comment({ comment, post}) {
  const { user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    post.comments = post.comments.filter((postComment) => (comment.comment_id !== postComment.comment_id));
    dispatch(updatePost(post.id, post));
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={comment.commenter} src={comment.commenter_image} />
      </ListItemAvatar>
      <ListItemText primary={comment.commenter} secondary={comment.comment} />
      {isAuthenticated && (comment.commenter_image === user.picture) ? (
        <IconButton onClick={handleDeleteComment}>
          <DeleteIcon />
        </IconButton>
      ) : null}
    </ListItem>
  );
}
