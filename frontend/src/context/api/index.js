import axios from 'axios';

const url_posts = 'http://localhost:5000/post';

export const fetchPosts = () => axios.get(`${url_posts}/list`);
export const createPost = (newPost) => axios.put(url_posts, newPost);
export const updatePost = (id,updatePost) => axios.patch(`${url_posts}/${id}`, updatePost);
export const deletePost = (id) => axios.delete(`${url_posts}/${id}/delete`);

const url_user = 'http://localhost:5000/user';
export const getUser = (id) => axios.get(`${url_user}/${id}`);
export const deleteUser = (id) => axios.delete(`${url_user}/delete/${id}`);