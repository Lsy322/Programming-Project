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
            <Paper className={classes.paper}>further extension</Paper>
        </Grid>

        <Grid item xs={5}>
            <PostList />
        </Grid>

        <Grid item xs={4}>
            <Paper className={classes.paper}>friend system</Paper>
        </Grid>
        
      </Grid>
    </div>
  );
}

export default Home;
