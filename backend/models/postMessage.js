var mongoose = require('mongoose');

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