import React, { useState } from "react";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { updatePost } from "../../context/action/posts";

export default function CommentBox({ post }) {
  const { user } = useAuth0();

  const [comment, setComment] = useState({
    comment_id: Math.random(),
    commenter: user.nickname,
    comment: "",
    commenter_image: user.picture,
  });

  const dispatch = useDispatch();

  const submitComment = (e) => {
    e.preventDefault();
    if (comment.comment.trim() !== "") {
      post.comments.push(comment);
      dispatch(updatePost(post.id, post));
    }
    clear();
  };

  const clear = () => {
    setComment({
      comment_id: Math.random(),
      commenter: user.nickname,
      comment: "",
      commenter_image: user.picture,
    });
  };
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="comment">comments on the post</InputLabel>
      <Input
        id="comment"
        //value should be made later
        value={comment.comment}
        onChange={(e) => setComment({ ...comment, comment: e.target.value })}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="comment button" onClick={submitComment}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
