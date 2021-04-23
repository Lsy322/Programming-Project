import * as api from '../api/index.js';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPreferPost = (userid) => async(dispatch) => {
  try {
    const {data} = await api.fetchPreferPost(userid);
    dispatch({type: 'FETCH_PREFER', payload: data});
  } catch (error) {
    console.log(error.message);
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const {data} = await api.createPost(post);
   
    dispatch({type: 'CREATE', payload: data});
  } catch (error){
    console.log(error.message);
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const {data} = await api.updatePost(id,post);

    dispatch({type: 'UPDATE', payload: data});
  } catch (error){
    console.log(error.message);
  }
}

export const deletePost = (id, type) => async (dispatch) => {
  try {
    await api.deletePost(id, type);

    dispatch({type: 'DELETE', payload: {id, type}});
  } catch (error){
    console.log(error.message);
  }
}


export const createRepost = (repostInfo) => async(dispatch) => {
  try {
    const {data} = await api.createRepost(repostInfo);
    dispatch({type: 'CREATE_REPOST', payload: data});
  } catch (error) {
    console.log(error.message);
  }
}