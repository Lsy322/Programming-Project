import React, { useEffect } from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "../context/api/index";
//importing components
import PostList from "../components/PostList";
import FullWidthTabs from "../components/Friend_Tab/Tab";

import {useSelector} from 'react-redux';

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
  const { user, isAuthenticated } = useAuth0();

  //USER INFORMATION
  const reduxUser = useSelector((state) => state.user);
  //USER FRIEND MANAGEMENT
  console.log(reduxUser);

  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>further extension</Paper>
        </Grid>

        <Grid item xs={5}>
          <PostList />
        </Grid>

        <Grid item xs={4}>
          <FullWidthTabs />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
