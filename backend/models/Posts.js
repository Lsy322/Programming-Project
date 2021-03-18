const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const postSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    img: {
        type: Buffer,
        contentType: String
    }
}, { timestamps: true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;