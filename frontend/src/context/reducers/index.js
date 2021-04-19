import {combineReducers} from 'redux';

import posts from './posts';
import testPost from './Test';
import user from './User';
import friendSystem from './FriendSystem';
export default combineReducers({
    posts,
    testPost,
    user,
    friendSystem,
})