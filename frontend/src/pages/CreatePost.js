import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

//importing component
import CreatePostForm from '../components/CreatePostForm';
const useStyle = makeStyles((theme)=>({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      
}));

const CreatePost = () => {
    const classes = useStyle();

    return (
        <Box display='flex' justifyContent="center">
            <CreatePostForm />
        </Box>
    );
}


export default CreatePost;