const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const messagesSchema = new Schema({
    author: Object,
    message: String

}, { timestamps: true});

const Messages = mongoose.model('messages', messagesSchema);
module.exports = Messages;