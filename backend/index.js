var express = require('express');
var mongoose = require("mongoose");
var cors = require("cors");
var request = require("request")
const morgan = require('morgan');
const app = express();

//router Import
var postRoutes = require('./routes/posts.js');
var userRoutes = require('./routes/user.js');
var chatroomRoutes = require('./routes/chatroom.js')

//Create live chat server
const ChatRooms = require('./models/ChatRooms');
const Messages = require('./models/Messages');

const http = require('http');
const server = http.Server(app)
const socketio = require('socket.io');
const io = socketio(server, {
    cors: {}
});

server.listen(4000,function(){
    console.log("socketIO server listening on 4000")
})


app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit:"30mb", extended: true}));
app.use(cors()); 
app.use(morgan('dev'))

app.use('/post',postRoutes);
app.use('/user',userRoutes);
app.use('/chat',chatroomRoutes);

const CONNECTION_URL = "mongodb+srv://mark:hkccpp@clips.ipkvx.mongodb.net/clips?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, () => console.log('Server running on port ' + PORT)))
.catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);

io.on('connection', (socket) => {
    console.log('Client '+socket.id+' has connected')
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
        console.log('Client '+socket.id+' has disconnected')
        socket.leave(roomId)
    })



})
