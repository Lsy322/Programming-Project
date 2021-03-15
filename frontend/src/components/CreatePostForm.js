import { TextField, Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import FileBase from "react-file-base64";

const CreatePostForm = () => {
  const [postData, setPostData] = useState({
    description: "",
    selectedFile: "",
  });

  
  return (
    <form autoComplete="off" noValidate >
      <Typography variant="h6">Create Posts</Typography>
      <TextField
        name="description"
        variant="outlined"
        label='description'
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
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
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
