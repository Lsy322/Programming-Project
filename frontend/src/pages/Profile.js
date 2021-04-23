import { useAuth0 } from "@auth0/auth0-react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../context/api/index";
import { addFriendRequest, deleteUser } from "../context/action/User";
import { useDispatch } from "react-redux";
import { getFriend, getFriendRequest } from "../context/action/FriendSystem";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const Profile = () => {
  const [userinfo, setUserInfo] = useState({
    nickname: "",
    user_id: "",
    picture: "",
    friends: [],
  });
  const [newName, setNewName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user, logout } = useAuth0();
  const dispatch = useDispatch();
  //Target ID of rendering the profile page
  const { id } = useParams();

  useEffect(() => {
    async function getAuth0User(id) {
      const id_to_be_parsed = id;
      const { data } = await api.getUser(id_to_be_parsed);
      setUserInfo({
        ...userinfo,
        email: data.email,
        nickname: data.nickname,
        user_id: data.user_id,
        friends: data.user_metadata.friends,
        picture: data.picture,
        email_verf: data.email_verified,
        createdAt: data.created_at,
      });
    }
    getAuth0User(id);
  }, []);

  //NEED TO IMPLEMENT IN REDUX LATER
  const handleDeleteUserClick = async () => {
    const id_to_be_deleted = id;
    logout({
      returnTo: window.location.origin,
    });
    dispatch(deleteUser(id_to_be_deleted));
  };

  const handleAddFriendClick = async () => {
    const user_id_to_be_sent = user.sub;
    const target_id_to_be_sent = id;
    dispatch(addFriendRequest(user_id_to_be_sent, target_id_to_be_sent));
    console.log("friend added");
  };

  const handleChangeNameClick = () => {
    console.log(newName);
    onCloseChangeNameDialog();
  };

  const onOpenChangeNameDialog = () => {
    setDialogOpen(true);
  };

  const onCloseChangeNameDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Box m={1}>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <Avatar src={userinfo.picture} />
        </div>
        <Typography align="center">
          {"Nickname: " + userinfo.nickname}
        </Typography>
        <Typography align="center">{"Email: " + userinfo.email}</Typography>
        <Typography align="center">
          {"Friends: " + userinfo.friends.length}
        </Typography>

        <hr></hr>
        <Typography align="center">
          <b>
            <u>{"User Actions:"}</u>
          </b>
        </Typography>

        {user.sub === userinfo.user_id ? ( //Render the detail of the user or not
          <p>
            <Typography align="center">
              {"Email Verified: " + userinfo.email_verf}
            </Typography>
            <Typography align="center">
              {"Joined At: " + new Date(userinfo.createdAt).toLocaleString()}
            </Typography>
            <div style={{ justifyContent: "center", display: "flex" }}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteUserClick}
              >
                Delete User
              </Button>
            </div>
          </p>
        ) : (
          <p></p>
        )}

        {/* Render deletion of itself or add friend request */}
        {user.sub === userinfo.user_id ? (
          <div style={{ justifyContent: "center", display: "flex" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AccountBoxIcon />}
              onClick={onOpenChangeNameDialog}
            >
              Change Name
            </Button>
          </div>
        ) : (
          <div style={{ justifyContent: "center", display: "flex" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddFriendClick}
            >
              Add Friend
            </Button>
          </div>
        )}

        {/* Render all post of the user */}
      </Box>
        {/* // DIALOG SETTING // */}
      <Dialog open={dialogOpen} onClose={onCloseChangeNameDialog}>
        <DialogTitle id='change-name-form'>Change Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please input your new name, and click the submit button
          </DialogContentText>
          <TextField
           autoFocus
           margin='dense'
           id='name'
           fullWidth
           value={newName}
           onChange={(e) => setNewName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseChangeNameDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleChangeNameClick} color='primary'>
            Change name
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    
  );
};

export default Profile;
