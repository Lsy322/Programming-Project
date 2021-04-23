var mongoose = require('mongoose');

const repoSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    author: Object,
    post_id: String,
    createdAt : Date
});

const repost = mongoose.model('reposts', repoSchema);

module.exports = repost;