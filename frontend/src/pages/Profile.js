import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import * as api from '../context/api/index';

const Profile = () => {
  const [userinfo, setUserInfo] = useState({
    nickname: "",
    user_id: "",
    picture: "",
    friends: [],
  });

  const { user } = useAuth0();
  const {id} = useParams();

  useEffect(() => {
   
   async function getAuth0User(id){
        const id_to_be_parsed = id.substring(6);
        const {data} = await api.getUser(id_to_be_parsed);
        setUserInfo(data);
   }
   console.log(id);
   getAuth0User(id);
  }, []);

  return (
    <Box m={1}>
      <Avatar src={userinfo.picture} />
      <Typography>{userinfo.nickname}</Typography>
      <Typography>{userinfo.user_id}</Typography>
      <Typography>{userinfo.friends.length}</Typography>
      {/* Render deletion of itself or add friend request */}
      {user.sub === userinfo.user_id ? (
        <Button variant="contained" color="primary">
          Delete User
        </Button>
      ) : (
        <Button variant="contained">Add Friend</Button>
      )}

      {/* Render all post of the user */}
    </Box>
  );
};

export default Profile;
