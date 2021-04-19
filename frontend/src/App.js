import React, { useEffect } from "react";
import { Switch, Route} from "react-router-dom";

import Home from "./pages/Home";
import Profile from './pages/Profile';
import CreatePost from "./pages/CreatePost";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {useAuth0} from '@auth0/auth0-react';
import { getPosts } from "./context/action/posts";
import {getUser} from './context/action/User';
import AuthenticationButton from './components/AuthButtons/authentication-button';
import ProtectedRoute from './auth/protected-route';
import { getFriend, getFriendRequest } from "./context/action/FriendSystem";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const {user, isAuthenticated} = useAuth0();
 
  useEffect(() => {
    dispatch(getPosts());
    if (isAuthenticated){
      dispatch(getUser(user.sub.substring(6)));
      dispatch(getFriend(user.sub.substring(6)));
      dispatch(getFriendRequest(user.sub.substring(6)));
    }
  }, [dispatch, isAuthenticated]);

  const {isLoading} = useAuth0();
  
  if(isLoading) {
    return <CircularProgress />
  }

  return (
    // navigation bar componen
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Test
          </Typography>

          {
            isAuthenticated ? 
           (<Button variant='contained' color='primary' href={`/profile/${user.sub}`}>
              Profile
            </Button>) : null
          }
          

          <Button variant="contained" color="primary" href="/createPost">
            Create Post
          </Button>

          <Button variant="contained" color="primary" href="/">
            Home
          </Button>
          <AuthenticationButton />
        </Toolbar>
      </AppBar>
      {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
      <Switch>
      {isAuthenticated ? (
        <ProtectedRoute path={`/profile/:id`} component={Profile}>
        </ProtectedRoute>
      ): null}
        
        <ProtectedRoute path="/createPost" component={CreatePost} />
        <Route path="/" exact component={Home} />
    
      </Switch>
    </div>
  );
};

export default App;
