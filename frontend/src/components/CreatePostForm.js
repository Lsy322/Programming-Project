import { TextField, Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import FileBase from "react-file-base64";
import {useDispatch} from 'react-redux';
import {createPost} from '../context/action/posts';
 //   {
  //     id: 'picture 2',
  //     title: 'title 2',
  //     author: 'Fekky',
  //     date: 'September 14, 2017',
  //     description: 'description 2',
  //     image: 'https://cdn.mos.cms.futurecdn.net/yL3oYd7H2FHDDXRXwjmbMf-970-80.jpg.webp',
  //     comments: [],
  //     annotations: [],
  //   }
const CreatePostForm = () => {
  const [postData, setPostData] = useState({
    title: '',
    author: 'User',
    description: "",
    image: "",
    comment: [],
    annotations:[],
  });
  const dispatch = useDispatch();

  const clear = () => {
    setPostData({
      title: '',
      author: 'User',
      description: "",
      image: "",
      comment: [],
      annotations:[],
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(createPost(postData));
    clear();
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Typography variant="h6">Create Posts</Typography>
      <TextField
      name="title"
      variant='outlined'
      label='title'
      fullWidth
      value={postData.title}
      onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
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
            setPostData({ ...postData, image: base64 })
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
