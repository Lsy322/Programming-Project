import React, { useState } from 'react';
import axios from '../components/Axios';
import {Button, makeStyles, TextField, Typography} from "@material-ui/core";
import Card from '@material-ui/core/Card';


const TestBackend = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: '10px',
            marginBottom: '10px',
        }
    }));

    const classes = useStyles();



    const [posts, setPost] = useState([
        {_id: '', body: '', createdAt: '', updateAt: ''}
        ])



    const GET = () => {
        axios.get('/allPosts')
            .then(res => setPost(res.data))
            .catch(err => console.log(err))
    }

    const DELETE = (e) => {
        console.log('delete: '+e.target.className)
        axios.delete(`/deletePost/${e.target.className}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    const UPDATE = (e) => {
        //e.preventDefault(false)

        console.log('update: '+e.target.className)
        const formData = new FormData();

        formData.append('body', updatePostData.body)
        formData.append('file', file)

        console.log(formData.data)
        axios({
            method: 'put',
            url: `http://localhost:5000/updatePost/${e.target.className}`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    const [postData, setPostData] = useState({
        body: ''
    });

    const [updatePostData, setUpdatePostData] = useState({
        body: ''
    })

    const [file, setFile] = useState();
    //const [isUploaded, setIsUploaded] = useState(false);


    const POST = (e) => {
        //e.preventDefault(false)


        const formData = new FormData();

        formData.append('body', postData.body)
        formData.append('file', file)

        console.log(formData.data)
        axios({
            method: 'post',
            url: 'http://localhost:5000/createPost',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        // work
        // if(postData.body.length==0){
        //     e.preventDefault(false)
        //     console.log('input something')
        // }else {
        //     axios.post('/createPost', {
        //         body: postData.body
        //     })
        //         .then(res => console.log(res.data))
        //         .catch(err => console.log(err))
        // }
    };


    return(
        <div>
            <div>
                <h1>get from backend</h1>
                <h2>result:</h2>
                {posts.map(post =>
                    <Card className={classes.root}>
                        <div key={post._id}  >
                            {post.body}
                            <button onClick={DELETE} className={post._id}>DELETE</button>
                            <form onSubmit={UPDATE} className={post._id}>
                                <TextField
                                    name="description"
                                    variant="outlined"
                                    label='description'
                                    fullWidth
                                    required={true}
                                    onChange={e => {setUpdatePostData({...updatePostData, body: e.target.value});}}
                                />
                                <input
                                    type="file"
                                    multiple={true}
                                    onChange={(e) => setFile(e.target.files)}
                                />
                                <button type='submit'>UPDATE</button>
                            </form>

                        </div>
                    </Card>
                )}
                <button onClick={GET}>GET</button>
            </div>

            <div>
                <form autoComplete="off" noValidate onSubmit={POST} >
                    <Typography variant="h6">Create Posts</Typography>

                    <TextField
                        name="description"
                        variant="outlined"
                        label='description'
                        fullWidth
                        required={true}
                        onChange={e => {setPostData({...postData, body: e.target.value});}}
                    />

                    <input
                        type="file"
                        multiple={true}
                        onChange={(e) => setFile(e.target.files)}
                    />
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
            </div>

        </div>
    )

}

export default TestBackend;
