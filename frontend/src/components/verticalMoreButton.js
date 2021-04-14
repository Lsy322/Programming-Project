import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

//dialogs
import AddAnnotationDialog from "./Add_Annotation/createAnnotation";
import ViewAnnotationDialog from "./View_Annotation/viewAnnotation";
import { useAuth0 } from "@auth0/auth0-react";
import PermissionDialog from "./PermissionDialog";
import { Dialog, DialogContentText, DialogTitle } from "@material-ui/core";

const options = [
  "Add annotation",
  "View & Delete annotation",
  "Set Permission",
];

const AlertDialog = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Authentication failed</DialogTitle>
        <DialogContentText>
          You are not authorized to use this function
        </DialogContentText>
      </Dialog>
    </div>
  );
};

const VerticalMoreButton = ({ post, postInfo, setPostInfo }) => {
  const { user, isAuthenticated } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [AddDialogOpen, setAddDialogOpen] = useState(false);
  const [ViewDialoagOpen, setViewDialogOpen] = useState(false);
  const [PermissionDialogOpen, setPermissionDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const handleAddDialogOpen = () => {
    if (
      user.name === post.author.name ||
      post.permission.annotationPermission
    ) {
      setAddDialogOpen(true);
    } else {
      setErrorDialogOpen(true);
    }
  };

  const handleViewDialogOpen = () => {
    setViewDialogOpen(true);
  };

  const handlePermissionDialogOpen = () => {
      if (user.name === post.author.name){
          setPermissionDialogOpen(true);
      } else {
          setErrorDialogOpen(true);
      }
  }
  
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (e) => {
    if (e.target.textContent === "Add annotation") {
      handleAddDialogOpen();
    } else if (e.target.textContent === "View & Delete annotation") {
      handleViewDialogOpen();
    } else if (e.target.textContent === "Set Permission") {
      handlePermissionDialogOpen();
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="post_action"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={(e) => handleMenuItemClick(e)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      <AddAnnotationDialog
        open={AddDialogOpen}
        setOpen={setAddDialogOpen}
        post={post}
        postInfo={postInfo}
        setPostInfo={setPostInfo}
      ></AddAnnotationDialog>

      <ViewAnnotationDialog
        open={ViewDialoagOpen}
        setOpen={setViewDialogOpen}
        post={post}
      ></ViewAnnotationDialog>

      <PermissionDialog
        open={PermissionDialogOpen}
        setOpen={setPermissionDialogOpen}
        post={post}
      ></PermissionDialog>

      <AlertDialog open={errorDialogOpen} setOpen={setErrorDialogOpen} />
    </div>
  );
};

export default VerticalMoreButton;
