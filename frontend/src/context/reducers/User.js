
export default (user = {}, action) => {
    switch(action.type) {
        case 'GET_USER':
            return action.payload;
        case 'DELETE_USER':
            return {};
        case 'USER_ADD_FRIEND_REQUEST':
            return user;
        case 'USER_ACCEPT_FRIEND_REQUEST':
            return action.payload;
        case 'USER_DELETE_FRIEND':
            return action.payload;
        case 'USER_DECLINE_FRIEND_REQUEST':
            return action.payload;
        case 'USER_CHANGE_NAME':
            return {...user, nickname: action.payload};
        default:
            return user;
    }
}