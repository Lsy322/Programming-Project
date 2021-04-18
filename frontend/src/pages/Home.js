import React, { useEffect } from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "../context/api/index";
//importing components
import PostList from "../components/PostList";
import FullWidthTabs from "../components/Friend_Tab/Tab";

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
  const { user } = useAuth0();

  useEffect(() => {
    async function findUser() {
      const id_to_be_sent = user.sub.substring(6);
      const { data } = await getUser(id_to_be_sent);
      console.log(data);
    }

    findUser();
  }, []);

  
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
