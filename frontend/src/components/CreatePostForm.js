import { TextField, Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../context/action/posts";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const CreatePostForm = () => {
  const { user } = useAuth0();

  const [postData, setPostData] = useState({
    title: "",
    author: user,
    description: "",
    image: "",
    comment: [],
    annotations: [],
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const clear = () => {
    setPostData({
      title: "",
      author: user,
      description: "",
      image: "",
      comment: [],
      annotations: [],
    });
  };

  const handleSubmit = async (e) => {
    if (postData.title.trim() !== "" && postData.image.trim() !== "") {
      e.preventDefault();
      dispatch(createPost(postData));
      clear();
      history.push("/"); // THE FUNCTION TO GO BACK TO HOME PAGE
    }
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Typography variant="h6">Create Posts</Typography>
      <TextField
        name="title"
        variant="outlined"
        label="title"
        fullWidth
        required
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <TextField
        name="description"
        variant="outlined"
        label="description"
        fullWidth
        value={postData.description}
        onChange={(e) =>
          setPostData({ ...postData, description: e.target.value })
        }
      />
      <div>
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setPostData({ ...postData, image: base64 })}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        fullWidth
      >
        Submit
      </Button>
    </form>
  );
};
export default CreatePostForm;
