
const initialState = {
    friends: [],
    friendRequests: [],
}

function friendReducer(friends = [], action) {
    switch (action.type) {
        case 'GET_FRIENDS':
            return action.payload;
        case 'ACCEPT_FRIEND_REQUEST':
            //do later
            console.log('go through');
            return [...friends, action.payload];
        default: 
            return friends;
    }
}

function friendRequestsReducer(friendRequests = [], action) {
    switch (action.type) {
        case 'GET_FRIEND_REQUESTS':
            return action.payload;
        case 'ACCEPT_FRIEND_REQUEST':
            console.log(friendRequests);
            return friendRequests.filter((request) => request.user_id !== action.payload);
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
        case 'ACCEPT_FRIEND_REQUEST':
            return {...friendSystem, friends: [...friendSystem.friends, action.payload.data], friendRequests: friendSystem.friendRequests.filter((request) => request.user_id !== action.payload.acceptedId)}
        case 'DECLINE_FRIEND_REQUEST':
            return {...friendSystem, friendRequests: friendSystem.friendRequests.filter((request) => request.user_id !== action.payload)}
        case 'DELETE_FRIEND':
            return {...friendSystem, friends: friendSystem.friends.filter((friend) => friend.user_id !== action.payload)}
        default:
            return friendSystem;
    }
}