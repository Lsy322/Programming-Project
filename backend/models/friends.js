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

const friendSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    user_id: String,
    friends: [String],
    friendRequest: [String]
});

const friend = mongoose.model('friends',friendSchema);

module.exports = friend;