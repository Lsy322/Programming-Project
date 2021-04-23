import {combineReducers} from 'redux';

import posts from './posts';
import user from './User';
import friendSystem from './FriendSystem';
export default combineReducers({
    posts,
    user,
    friendSystem,
})