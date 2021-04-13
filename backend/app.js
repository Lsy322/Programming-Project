const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const Post = require('./models/Posts');
const fs = require('fs');
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const   { v4: uuidv4 } = require('uuid');

//<username>:<password>@clips.ipkvx.mongodb.net/<database name>?retryWrites=true&w=majority

const dbUrl = 'mongodb+srv://mark:hkccpp@clips.ipkvx.mongodb.net/clips?retryWrites=true&w=majority';
//for stopping warning
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => server.listen(port))
    .catch((err) => console.log(err));

//middleware
app.use(morgan('dev'))
app.use(cors())
app.use(fileUpload({createParentPath: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


let chat = []

const isExist = (user) => {
    if(chat.includes(user))
        console.log(chat)
}
isExist(7)
app.get('/liveChat/createRoom', ((req, res) => {
    //let
    console.log(req.body.userName)
    //if(isExist(req.body.userName))
    res.redirect(`/liveChat/${uuidv4()}`)
}))


app.get('/liveChat/:roomId', ((req, res) => {
    res.send(req.params.roomId)
}))

io.on('connection', (socket) => {
    socket.on('join', (roomId) => {
        const roomClients = io.sockets.adapter.rooms[roomId] || { length: 0 }
        const numberOfClients = roomClients.length

        // These events are emitted only to the sender socket.
        if (numberOfClients == 0) {
            console.log(`Creating room ${roomId} and emitting room_created socket event`)
            socket.join(roomId)
            socket.emit('room_created', roomId)
        } else if (numberOfClients == 1) {
            console.log(`Joining room ${roomId} and emitting room_joined socket event`)
            socket.join(roomId)
            socket.emit('room_joined', roomId)
        } else {
            console.log(`Can't join room ${roomId}, emitting full_room socket event`)
            socket.emit('full_room', roomId)
        }
    })

    // These events are emitted to all the sockets connected to the same room except the sender.
    socket.on('start_call', (roomId) => {
        console.log(`Broadcasting start_call event to peers in room ${roomId}`)
        socket.broadcast.to(roomId).emit('start_call')
    })
    socket.on('webrtc_offer', (event) => {
        console.log(`Broadcasting webrtc_offer event to peers in room ${event.roomId}`)
        socket.broadcast.to(event.roomId).emit('webrtc_offer', event.sdp)
    })
    socket.on('webrtc_answer', (event) => {
        console.log(`Broadcasting webrtc_answer event to peers in room ${event.roomId}`)
        socket.broadcast.to(event.roomId).emit('webrtc_answer', event.sdp)
    })
    socket.on('webrtc_ice_candidate', (event) => {
        console.log(`Broadcasting webrtc_ice_candidate event to peers in room ${event.roomId}`)
        socket.broadcast.to(event.roomId).emit('webrtc_ice_candidate', event)
    })
})


app.get('/add-post', ((req, res) => {
    const post = new Post({
        body: "something2"
    });

    post.save()
        .then((result) => {res.send(result)} )
        .catch((err)=>console.log(err));
}))

app.get('/singlePost/:id', ((req, res) => {
    Post.findById({_id: req.params.id})
        .then((result)=>res.send(result))
        .catch((err)=>console.log(err));

}))


app.get('/allPosts', ((req, res) => {
    Post.find()
        .then((result)=>res.send(result))
        .catch((err)=>console.log(err));
}))

app.delete('/deletePost/:id', (req, res) => {

    console.log('delete: '+req.params.id)
    Post.findOneAndDelete({_id: req.params.id})
        .then((result) => {res.send(result)} )
        .catch((err)=>console.log(err));

    // Post.deleteOne({_id: req.params.id})
    //     .then((result) => {res.send(result)} )
    //     .catch((err)=>console.log(err));

})

app.put('/updatePost/:id', (req, res) => {

    console.log('update: '+req.params.id)
    console.log('update data: '+req.body.body)
    console.log('update data: '+req.body.file.name)
    Post.findOneAndUpdate({_id: req.params.id},{
        'body': req.body.body
    })
        .then((result) => {res.send(result)} )
        .catch((err)=>console.log(err));

    // Post.deleteOne({_id: req.params.id})
    //     .then((result) => {res.send(result)} )
    //     .catch((err)=>console.log(err));

})

app.post('/createPost', ((req, res) => {
    //let data = new Buffer(req.files.file.data);
    //let FILES = req.files;
    //console.log('files: '+FILES)
    console.log(req.body.body)
    console.log(req.body.file.name)
    //buffer = req.files.file

    const post = new Post({
        body: req.body.body
        // ,
        // file: null
    });

    post.save()
        .then((result) => {res.send(result)} )
        .catch((err)=>console.log(err));
}))


app.get('/', function (req,res){
    res.send('hello world')
})

