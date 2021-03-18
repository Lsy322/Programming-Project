const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    cors = require('cors'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    fileUpload = require('express-fileupload'),
    Post = require('./models/Posts'),
    fs = require('fs');

//<username>:<password>@clips.ipkvx.mongodb.net/<database name>?retryWrites=true&w=majority

const dbUrl = 'mongodb+srv://mark:hkccpp@clips.ipkvx.mongodb.net/clips?retryWrites=true&w=majority';

//for stopping warning
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));

//middleware
app.use(morgan('dev'))
app.use(cors())
app.use(fileUpload({createParentPath: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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

