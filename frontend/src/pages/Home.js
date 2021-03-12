import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";


//importing components
import PostList from '../components/PostList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={5} >
        <Grid item xs={3} >
            <Paper className={classes.paper}>xs=3</Paper>
        </Grid>

        <Grid item xs={5}>
            <Paper className={classes.paper}>
                <PostList></PostList>
            </Paper>
        </Grid>

        <Grid item xs={4}>
            <Paper className={classes.paper}>xs=4</Paper>
        </Grid>
        
      </Grid>
    </div>
  );
}

export default Home;
