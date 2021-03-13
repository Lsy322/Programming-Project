var express = require('express')
var app = express()

//db variable
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/backend');
// let db = mongoose.connection;

//Check Connection
// db.once('open', function(){
//     console.log('Connected to mongoDB')
// })

//Check for db error
// db.on('error',function(err){
//     console.log(err);
// });

//Default
app.get('/', (req,res) => {
    res.send('hello world')
})

//ListPosts
app.get('/Posts', (req,res) =>{
    res.json({message:'Listed Posts'})
})

//NewPost
app.put('/newPost',(req,res)=>{
    res.json({message:'Created New Post Successfully'})
})

//DeletePost
app.post('/deletePost/:id' , (req,res) => {
    if (!req.params.id){
        res.json({messsage:'Error deleting post'})
        return
    }
    res.json({message:'deleted clip with id ' + req.params.id})
})


app.listen(5000, () => {
    console.log('Server running on port 5000...')
})