import {combineReducers} from 'redux';

import posts from './posts';
import testPost from './Test';
export default combineReducers({
    posts,
    testPost
})