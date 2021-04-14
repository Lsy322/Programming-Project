import {
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from "@material-ui/core";
import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import { updatePost } from "../context/action/posts";

const PermissionDialog = ({ open, setOpen, post }) => {
  
  const dispatch = useDispatch();

  const [permission, setPermission] = useState({
    annotation: post.permission.annotationPermission,
    view: post.permission.viewPermission,
    comment: post.permission.commentPermission,
  })


  const handleClose = () => {
    setOpen(false);
    post.permission.annotationPermission = permission.annotation;
    post.permission.viewPermission = permission.view;
    post.permission.commentPermission = permission.comment;
    dispatch(updatePost(post.id, post));
  };

 
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Permission</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText id="annotation_permission" primary="Annotation" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={permission.annotation}
                  onChange={() => setPermission({...permission, annotation: !permission.annotation})}
                />
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemText id="comment_permission" primary="Comment" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={permission.comment}
                  onChange={() => setPermission({...permission, comment: !permission.comment})}
                />
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemText id="view_permission" primary="Friends only" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={permission.view}
                  onChange={() => setPermission({...permission, view: !permission.view})}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermissionDialog;
