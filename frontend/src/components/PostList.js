import React,{useState} from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";
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
  const posts = useSelector((state) => state.posts);
  
  const testPost = useSelector((state) => state.testPost);
  const classes = useStyles();
  console.log(posts);
  
  return (
    !posts.length ? <CircularProgress /> : (<Box className={classes.postContainer} >
      {
        posts.map((post)=> (
          <Post key={post._id} className={classes.border} my={2} post={post} />
        ))
      }
    </Box>
    )
  );
};

export default PostList;
