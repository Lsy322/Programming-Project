
const initialState = {
    friends: [],
    friendRequests: [],
}

function friendReducer(friends = [], action) {
    switch (action.type) {
        case 'GET_FRIENDS':
            return action.payload;
        default: 
            return friends;
    }
}

function friendRequestsReducer(friendRequests = [], action) {
    switch (action.type) {
        case 'GET_FRIEND_REQUESTS':
            return action.payload;
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
        //     console.log('reached');
        //     return 
        default:
            return friendSystem;
    }
}