import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import VerticalMoreButton from "./verticalMoreButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { useDispatch } from "react-redux";
import { deletePost } from "../context/action/posts";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Post({ post }) {
  const classes = useStyles();

  const [postInfo, setPostInfo] = useState(post);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("post info changed");
  }, [postInfo]);

  const { isAuthenticated, user } = useAuth0();

  const handleDeleteClick = () => {
    dispatch(deletePost(post._id));
  };

  console.log(post.author);
  console.log(user);
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
        subheader={post.createAt}
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

        {/* DELETE ICON */}
        {isAuthenticated && user.sub === post.author.sub ? (
          <IconButton aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        ) : null}
      </CardActions>
      <Divider />

      {/* COMMENT LIMITATION */}
      {isAuthenticated ? (
        <FormControl fullWidth>
          <InputLabel htmlFor="comment">comments on the post</InputLabel>
          <Input
            id="comment"
            //value should be made later
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="comment button">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      ) : null}
    </Card>
  );
}
