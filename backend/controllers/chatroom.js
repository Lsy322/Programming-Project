var user = require("./user.js")
const ChatRooms = require('../models/ChatRooms');
const Messages = require('../models/Messages');

const fetchUser = user.fetchUser

let users = [
    { user: "user1"},
    { user: "user2"},
    { user: "user3"},
    { user: 'user4'}
]

module.exports = {
    getUserRoom : (req,res)=>{
        ChatRooms.find({users: {$elemMatch:{user:req.params.user}}})
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
    },
    getRoomData : (req,res)=>{
        ChatRooms.findById({_id: req.params.roomId})
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
    },
    createRoom : (req,res)=>{
        let index;

    for(i = 0; i < users.length;i++){
        if(req.body.user == users[i].user)
            index = i
    }

    const chatRoom = new ChatRooms({
        title: req.body.roomTitle,
        users: users[index]
    })
    chatRoom.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
    },
    addUserToRoom : (req,res)=>{
        ChatRooms.find({$and: [
            {_id: req.body.roomId},
            {users: {$elemMatch:{user:req.body.user}}}
        ]})
        .then(result => {
            if(result.length == 0){

                let index;

                for(i = 0; i < users.length;i++){
                    if(req.body.user == users[i].user)
                        index = i
                }
                if(index >= 0){
                    ChatRooms.findByIdAndUpdate({_id: req.body.roomId}, {$push: {users: users[index]}})
                        .then(result => res.send('added'))
                        .catch(err => console.log(err))
                }else{
                    res.send('user not exists')
                }
            }else{
                res.send('user already added')
            }
        })
    },
    addMessage : (req,res)=>{
        const message = new Messages({
            author: req.body.author,
            message: req.body.message
        })
        message.save()
            .then(() => {
                ChatRooms.findByIdAndUpdate({_id: req.body.roomId}, {$push: {messages: message}})
                    .then((result) => res.send(result))
                    .catch((err) => console.log(err))
            })
    }
}