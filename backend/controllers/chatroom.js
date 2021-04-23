var user = require("./user.js")
const ChatRooms = require('../models/ChatRooms');
const Messages = require('../models/Messages');

const fetchUser = user.fetchUser
const fetchUserByEmail = user.fetchUserByEmail

module.exports = {
    getUserRoom : (req,res)=>{
        ChatRooms.find({$or:[{"users.sub": req.params.user},{"users.user_id":req.params.user}]})
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
    },
    getRoomData : (req,res)=>{
        ChatRooms.findById({_id: req.params.roomId})
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
    },
    createRoom : (req,res)=>{

    const chatRoom = new ChatRooms({
        title: req.body.roomTitle,
        users: req.body.user
    })
    chatRoom.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
    },
    addUserToRoom : (req,res)=>{
        ChatRooms.find({_id: req.body.roomId,"users.email":req.body.email})
        .then(result => {
            if(result.length == 0){
                fetchUserByEmail(req.body.email)
                .then((result)=>{
                    if (result == undefined){
                        res.send('user not exists')
                        return
                    }
                    ChatRooms.findByIdAndUpdate({_id: req.body.roomId}, {$push: {users: result}})
                        .then(result => res.send('added'))
                        .catch(err => console.log(err))
                })
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