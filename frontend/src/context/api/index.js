import axios from 'axios';

const url_posts = 'http://localhost:5000/post/list';

export const fetchPosts = () => axios.get(url_posts);