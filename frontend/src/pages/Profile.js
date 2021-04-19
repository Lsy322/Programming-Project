import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import * as api from '../context/api/index';
import {addFriendRequest, deleteUser} from '../context/action/User';
import {useDispatch} from 'react-redux';
import { getFriend, getFriendRequest } from "../context/action/FriendSystem";
const Profile = () => {
  const [userinfo, setUserInfo] = useState({
    nickname: "",
    user_id: "",
    picture: "",
    friends: [],
  });

  const { user, logout} = useAuth0();
  const dispatch = useDispatch();
  //Target ID of rendering the profile page
  const {id} = useParams();

  useEffect(() => {
   
   async function getAuth0User(id){
        const id_to_be_parsed = id.substring(6);
        const {data} = await api.getUser(id_to_be_parsed);
        setUserInfo(data);
   }
   getAuth0User(id);
  }, []);

  //NEED TO IMPLEMENT IN REDUX LATER
  const handleDeleteUserClick = async() => {      
    const id_to_be_deleted = id.substring(6);
    logout({
        returnTo: window.location.origin,
      });
    dispatch(deleteUser(id_to_be_deleted));
  }

  const handleAddFriendClick = async() => {
      const user_id_to_be_sent = user.sub.substring(6);
      const target_id_to_be_sent = id.substring(6);
      dispatch(addFriendRequest(user_id_to_be_sent,target_id_to_be_sent));
      console.log('friend added');
   }


  return (
    <Box m={1}>
      <Avatar src={userinfo.picture} />
      <Typography>{userinfo.nickname}</Typography>
      <Typography>{userinfo.user_id}</Typography>
      <Typography>{userinfo.friends.length}</Typography>
      {/* Render deletion of itself or add friend request */}
      {user.sub === userinfo.user_id ? (
        <Button variant="contained" color="secondary" onClick={handleDeleteUserClick}>
          Delete User
        </Button>
      ) : (
        <Button variant="contained" color='primary' onClick={handleAddFriendClick}>Add Friend</Button>
      )}

      {/* Render all post of the user */}
    </Box>
  );
};

export default Profile;
