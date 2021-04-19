
export default (user = {}, action) => {
    switch(action.type) {
        case 'GET_USER':
            return action.payload;
        case 'DELETE':
            return {};
        case 'USER_ADD_FRIEND_REQUEST':
            return user;
        case 'USER_ACCEPT_FRIEND_REQUEST':
            return action.payload;
        default:
            return user;
    }
}