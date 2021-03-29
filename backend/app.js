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


// testing

const n2 = (n, res) =>{
    return new Promise(resolve => {
        for(let i = 0; i<n;i++)
            for(let j = 0; j<n;j++)
        resolve('resolved')
    })
}

const calln2 = async (n, res) => {
    console.log('calling');
    const result = await n2(n, res)
    console.log(result);
}

function resolveAfter2Seconds(n) {
    return new Promise(resolve => {
        // for(let i = 0; i<n;i++)
        //     for(let j = 0; j<n;j++)
        //         console.log(`${i}:${j}`)
        // resolve('resolved');
        setTimeout(() => {
            resolve('resolved');
        }, n);
    });
}

async function asyncCall(n) {
    console.log('calling');
    const result = await resolveAfter2Seconds(n);
    console.log(result);
    // expected output: "resolved"
}

app.get('/n2/:n', ((req, res) => {
    const n = req.params.n

    //res.send('Started')
    // calln2(n)
    // console.log(1)
    // calln2(n)
    // console.log(2)
    // calln2(n)
    // console.log(3)
    calln2(n).then(() => res.sendStatus(200))

    //res.send('hey')
}))

//-----

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

io.on('connection', socket => {
    if(false){
        console.log('new client connected')

        socket.on('join', () => {
            console.log('hey')
        })


    }else{

    }
    socket.on('disconnect', (userName, roomId) =>{
        console.log('client disconnected')
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

