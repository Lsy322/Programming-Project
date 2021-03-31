var mongoose = require('mongoose');

    //FORMAT OF EACH POST
    //     id: mongoose.Types.ObjectId,
    //     title: 'title 2', (STRING)
    //     author: 'Fekky', (STRING)
    //     date: 'September 14, 2017', (USE DEFAULT VALUE)
    //     description: 'description 2', (STRING)
    //     image: 'https://cdn.mos.cms.futurecdn.net/yL3oYd7H2FHDDXRXwjmbMf-970-80.jpg.webp',
    //     comments: [],
    //     annotations: [],

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type:Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    id: {
        type: String
    }
});

const PostMessage = mongoose.model('posts',postSchema);

module.exports = PostMessage;