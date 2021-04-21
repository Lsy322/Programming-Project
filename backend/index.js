var express = require('express');
var mongoose = require("mongoose");
var cors = require("cors");
var request = require("request")
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const app = express();

//router Import
var postRoutes = require('./routes/posts.js');
var userRoutes = require('./routes/user.js')

//Create live chat server
const ChatRooms = require('./models/ChatRooms');
const Messages = require('./models/Messages');

const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server, {
    cors: {
        //origin: "http://localhost:3000"
    }
});


app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit:"30mb", extended: true}));
app.use(cors()); 
app.use(morgan('dev'))

app.use('/post',postRoutes);
app.use('/user',userRoutes);

const CONNECTION_URL = "mongodb+srv://mark:hkccpp@clips.ipkvx.mongodb.net/clips?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, () => console.log('Server running on port ' + PORT)))
.catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);

let users = [
    { user: "user1"},
    { user: "user2"},
    { user: "user3"},
    { user: 'user4'}
]

app.get('/chat/getRooms/:user', ((req, res) => {
    ChatRooms.find({users: {$elemMatch:{user:req.params.user}}})
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
}))

app.get('/chat/getRoomData/:roomId', ((req, res) => {
    ChatRooms.findById({_id: req.params.roomId})
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
}))

app.post('/chat/createRoom', ((req, res) => {
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
}))

app.put('/chat/addUser',((req, res) => {

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

}))

app.put('/chat/sendMessage', ((req, res) => {

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
}))

io.on('connection', (socket) => {
    const roomId = socket.handshake.query.roomId
    socket.join(roomId)
    socket.on('update', (roomId) =>{
        ChatRooms.findById({_id: roomId})
            .then((result) => {
                io.in(roomId).emit('update', result)
            })
            .catch((err) => console.log(err))

    })

    socket.on('disconnect', () => {
        console.log('Client '+socket.id+' disconnected')
        socket.leave(roomId)
    })



})
