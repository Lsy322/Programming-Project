import React,{useState} from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import {useSelector} from 'react-redux';
//import elements from components
import Post from "./Post";
import Repost from './Re-Post';


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
  const classes = useStyles();
  console.log(posts);
  
  return (
    !posts.length ? <CircularProgress /> : (
    <Box className={classes.postContainer} >
      {
        posts.map((post)=> (
          (post.Type === 'Repost') ? (
            <Repost key={post.repostId} className={classes.border} my={2} post={post}/>
          ):
          (
            <Post key={post._id} className={classes.border} my={2} post={post} />
          )
          
        ))
      }
    </Box>
    )
  );
};

export default PostList;
