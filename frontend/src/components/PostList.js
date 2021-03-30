import React,{useState} from "react";
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
  const posts = useSelector((state) => state.posts);
  
  const testPost = useSelector((state) => state.testPost);
  const classes = useStyles();
  console.log(testPost);
  console.log(posts);
  //used test case to parse the data of the posts to the lower level components
  // const [testPosts, setTestPosts] = useState([
  //   {
  //     id: 'picture 1',
  //     title: 'Shrimp and Chorizo Paella',
  //     author: 'R',
  //     date: 'September 14, 2016',
  //     description: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
  //     image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGljdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
  //     comments: [],
  //     annotations: [
  //       {
  //         data: {text: 'Hello!', id: 0.5986265691759928},
  //         geometry: {type: 'RECTANGLE', x: 25.571428571428573, y: 33, width: 21.142857142857142, height: 34}
  //       },
  //       {
  //         data: {text: 'Hi!', id: 0.5986265691759929},
  //         geometry: {type: 'RECTANGLE', x: 50.571428571428573, y: 33, width: 21.142857142857142, height: 34}
  //       }
  //     ],
  //   },
  //   {
  //     id: 'picture 2',
  //     title: 'title 2',
  //     author: 'Fekky',
  //     date: 'September 14, 2017',
  //     description: 'description 2',
  //     image: 'https://cdn.mos.cms.futurecdn.net/yL3oYd7H2FHDDXRXwjmbMf-970-80.jpg.webp',
  //     comments: [],
  //     annotations: [],
  //   }
  // ]);
 
  

  return (
    <Box className={classes.postContainer} >
      {
        testPost.map((post)=> (
          <Post key={post.id} className={classes.border} my={2} post={post} />
        ))
      }
    </Box>
  );
};

export default PostList;
