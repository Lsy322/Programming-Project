import axios from 'axios';

const url_posts = 'http://localhost:5000/post/list';

export const fetchPosts = () => axios.get(url_posts);
export const createPost = (newPost) => axios.put(url_posts, newPost);
export const updatePost = (id,updatePost) => axios.patch(`${url_posts}/${id}`, updatePost);