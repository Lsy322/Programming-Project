

export default (posts = [], action) => {
    switch(action.type){
        case 'FETCH_ALL':
            return action.payload;
        case 'FETCH_PREFER':
            return action.payload;
        case 'CREATE':
            return [action.payload, ...posts];
        case 'UPDATE':
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case 'DELETE':
            if (action.payload.type === 'Normal'){
                return posts.filter((post) => post._id !== action.payload.id);
            } else {
                return posts.filter((post) => post.repostId !== action.payload.id);
            }    
        case 'CREATE_REPOST':
            return [action.payload, ...posts];
        default: 
            return posts;
    }
}