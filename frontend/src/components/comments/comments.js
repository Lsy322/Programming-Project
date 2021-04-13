import React from 'react';
import {List, makeStyles} from '@material-ui/core';
import Comment from './comment';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

export default function Comments({post}) {

    const classes = useStyles();
    return (
        <List className={classes.root}>
            {
                post.comments.map((comment)=>(<Comment key={comment.comment_id} comment={comment} post={post}/>))
            }
        </List>
    );
}