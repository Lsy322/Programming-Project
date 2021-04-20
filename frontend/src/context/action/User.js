import * as api from '../api/index';

export const getUser = (id) => async (dispatch) => {
    try {
      const { data } = await api.getUser(id);
      dispatch({ type: 'GET_USER', payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

export const deleteUser = (id) => async(dispatch) => {
    try {
        await api.deleteUser(id);
        dispatch({type: 'DELETE'});
    } catch (error) {
        console.log(error.message);
    }
};

export const addFriendRequest = (userid, targetid) => async(dispatch) => {
    try {
        await api.addFriendRequest(userid, targetid);
        dispatch({type: 'USER_ADD_FRIEND_REQUEST'});
    } catch (error) {
        console.log(error.message);
    }
}

export const acceptFriendRequest = (userid, acceptId) => async(dispatch) => {
    try {
        await api.acceptFriendRequest(userid,acceptId);
        const {data} = await api.getUser(userid);
        dispatch({type: 'USER_ACCEPT_FRIEND_REQUEST', payload: data});
        // dispatch({type: 'ACCEPT_FRIEND_REQUEST', payload: acceptId });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteFriend = (userid, removeId) => async(dispatch) => {
    try{
        await api.deleteFriend(userid,removeId);
        const {data} = await api.getUser(userid);
        dispatch({type: 'USER_DELETE_FRIEND', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}