const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const chatRoomsSchema = new Schema({
    title: String,
    users: [Object],
    messages: [Object]

}, { timestamps: true});

const ChatRooms = mongoose.model('chatRooms', chatRoomsSchema);
module.exports = ChatRooms;