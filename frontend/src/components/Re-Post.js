import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import {useDispatch} from 'react-redux';
import { red } from "@material-ui/core/colors";
import { deletePost } from "../context/action/posts";
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

const Repost = ({ post }) => {
  const classes = useStyles();
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  

  const handleDeleteClick = () => {
    dispatch(deletePost(post.repostId, post.Type));
  };

  var time = new Date(post.repostDate); //time Convertion
  var timeString = time.toString();

  var timeCreate = new Date(post.createAt).toString();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar className={classes.avatar} src={post.repostAuthor.picture} />}
        title={`@Repost/ ${post.title}`}
        subheader={"Reposted at " + timeString + " by " + post.repostAuthor.nickname}
      />

      <Card>
        <CardHeader  avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={post.author.picture}
          />
        }
        
        title={post.title}
        subheader={"Posted at " + timeCreate + " by " + post.author.nickname} />
        <CardMedia className={classes.media} image={post.image} />
        <CardContent>{post.description}</CardContent>
      </Card>
      <CardActions disableSpacing>
          {/* DELETE ICON */}
        {isAuthenticated && (user.sub === post.repostAuthor.sub) ? (
          <IconButton aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default Repost;
