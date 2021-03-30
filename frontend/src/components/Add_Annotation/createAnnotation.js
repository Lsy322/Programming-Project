import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import AddAnnotation from './Annotation_Add';

const AddAnnotationDialog = ({ open, setOpen, post, postInfo, setPostInfo }) => {
  const handleClose = () => {
    setOpen(false);
  };




  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add annotation</DialogTitle>
        <DialogContent>
          <AddAnnotation post={post} postInfo={postInfo} setPostInfo={setPostInfo}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAnnotationDialog;
