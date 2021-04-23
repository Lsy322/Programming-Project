import * as api from '../api/index';

//FRIEND REDUCER ACTION
export const getFriend = (id) => async (dispatch) => {
    try {
      const { data } = await api.getFriend(id);
      if (Array.isArray(data)){
          dispatch({ type: 'GET_FRIENDS', payload: data });
      } else {
          dispatch({ type: 'GET_FRIENDS', payload: [] });
      }
      
    } catch (error) {
      console.log(error.message);
    }
  };

//FRIEND REQUESTS REDUCER ACTION
export const getFriendRequest = (id) => async(dispatch) => {
    try {
        const {data} = await api.getFriendRequest(id);
        if (Array.isArray(data)){
            dispatch({type: 'GET_FRIEND_REQUESTS', payload: data});
        } else {
            dispatch({type: 'GET_FRIEND_REQUESTS', payload: []});
        }
    } catch (error) {
        console.log(error);
    }
}

export const acceptFriendRequest_usingAuth0 = (acceptedId) =>  async(dispatch) => {
    try {
        const {data} = await api.getUser(acceptedId);
        console.log(data);
        dispatch({
            type: 'ACCEPT_FRIEND_REQUEST',
            payload: {
                data,
                acceptedId
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const declineFriendRequest_usingAuth0 = (declineId) => {
    return {
        type: 'DECLINE_FRIEND_REQUEST',
        payload: declineId
    }
}

export const deleteFriend_usingAuth0 = (deleteId) => {
    return {
        type: 'DELETE_FRIEND',
        payload: deleteId
    }
}