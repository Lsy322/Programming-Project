var mongoose = require('mongoose');

const repoSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    post_id: String,
    repostAt: {
        type: Date,
        default: new Date()
    }
});

const repost = mongoose.model('repost', repoSchema);

module.exports = repoSchema;