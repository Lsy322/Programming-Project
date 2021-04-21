import axios from "axios";

const url_posts = "http://localhost:5000/post";

export const fetchPosts = () => axios.get(`${url_posts}/list`);
export const createPost = (newPost) => axios.put(url_posts, newPost);
export const updatePost = (id, updatePost) =>
  axios.patch(`${url_posts}/${id}`, updatePost);
export const deletePost = (id) => axios.delete(`${url_posts}/${id}/delete`);
export const fetchPreferPost = (userid) => 
axios({
  method: 'post',
  url: `${url_posts}/prefer`,
  data: {
    sub: userid
  }
});
export const createRepost = (post_id) => axios.put(url_posts, post_id);

const url_user = "http://localhost:5000/user";
export const getUser = (id) => axios.get(`${url_user}/${id}`);
export const deleteUser = (id) => axios.delete(`${url_user}/delete/${id}`);

export const getFriend = (id) => axios.get(`${url_user}/friends/${id}`);
export const getFriendRequest = (id) => axios.get(`${url_user}/friendRequest/${id}`);
export const addFriendRequest = (userid, targetid) =>
  axios({
    method: "post",
    url: `${url_user}/sendRequest`,
    data: {
      RecieveId: targetid,
      SendId: userid,
    },
  });
export const acceptFriendRequest = (userid, acceptId) => 
axios({
  method: 'put',
  url: `${url_user}/acceptRequest`,
  data: {
    uid: userid,
    acceptedId: acceptId,
  },
});
export const deleteFriend = (userid, removeId) => 
axios({
  method: 'delete',
  url: `${url_user}/removeFriend`,
  data: {
    uid: userid,
    removeId: removeId,
  }
})
export const declineFriendRequest = (userid, removeId) => 
axios({
  method: 'delete',
  url: `${url_user}/removeRequest`,
  data: {
    RecieveId: userid,
    RemoveId: removeId
  }
})