const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const Post = require('./models/Posts');
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
const { v4: uuidv4 } = require('uuid');

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

