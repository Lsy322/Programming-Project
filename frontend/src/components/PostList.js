import React from "react";
import { Box, Paper, makeStyles } from "@material-ui/core";
import {useSelector} from 'react-redux';
//import elements from components
import Post from "./Post";



const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  postContainer: {
    display: "flex",
    flexDirection: "column",
  },
  
}));

//A container to contain all the post element
const PostList = () => {
  //the state have to be confirmed
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  return (
    <Box className={classes.postContainer} >
      <Post className={classes.border} my={2}/>
      <Post className={classes.border} my={2}/>
      <Post className={classes.border} my={2}/>
    </Box>
  );
};

export default PostList;
