import * as api from '../api/index';

//FRIEND REDUCER ACTION
export const getFriend = (id) => async (dispatch) => {
    try {
      const { data } = await api.getFriend(id);
      dispatch({ type: 'GET_FRIENDS', payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

//FRIEND REQUESTS REDUCER ACTION
export const getFriendRequest = (id) => async(dispatch) => {
    try {
        const {data} = await api.getFriendRequest(id);
        dispatch({type: 'GET_FRIEND_REQUESTS', payload: data});
    } catch (error) {
        console.log(error);
    }
}