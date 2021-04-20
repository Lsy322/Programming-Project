
const initialState = {
    friends: [],
    friendRequests: [],
}

function friendReducer(friends = [], action) {
    switch (action.type) {
        case 'GET_FRIENDS':
            return action.payload;
        // case 'ACCEPT_FRIEND_REQUEST':
        //     return friends;
        default: 
            return friends;
    }
}

function friendRequestsReducer(friendRequests = [], action) {
    switch (action.type) {
        case 'GET_FRIEND_REQUESTS':
            return action.payload;
        // case 'ACCEPT_FRIEND_REQUEST':
        //     return friendRequests.filter((request) => request.user_id.substring(6) !== action.payload);
        default:
            return friendRequests;
    }
}

export default (friendSystem = initialState, action) => {
    switch (action.type) {
        case 'GET_FRIENDS':
            return {...friendSystem, friends: friendReducer(friendSystem.friends, action) }
        case 'GET_FRIEND_REQUESTS':
            return {...friendSystem, friendRequests: friendRequestsReducer(friendSystem.friendRequests, action) }
        // case 'ACCEPT_FRIEND_REQUEST':
        //     friendSystem = {...friendSystem, friends: friendReducer(friendSystem.friends, action) };
        //     friendSystem = {...friendSystem, friendRequests: friendRequestsReducer(friendSystem.friendRequests, action)};
        //     return friendSystem;
        default:
            return friendSystem;
    }
}