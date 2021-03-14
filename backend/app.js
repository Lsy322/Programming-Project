var express = require('express')
var app = express()
var post_Info = require('./post_Info')
var formidable = require('formidable')
var path = require('path')
var fs = require('fs')
app.use(express.urlencoded({extended: true}))

//Require Database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/ProgrammingProject")
.then(()=> {console.log("Connected database")},
err=>{console.log("Error connecting to database")})

var db = mongoose.connection;
var postCollection = db.collection("posts")

//Variable
var dir = "UploadDir"
var docCount = 0

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
    docCount = 0;
    var cursor = postCollection.find({}) //get the database cursor
    cursor.forEach(element => { //get document count
        docCount++
    })
    .then(()=>{
        // var testdoc = {id:docCount, name:"admin",title:"TestTitle"} //Inserting a testing document
        // postCollection.insertOne(testdoc)
        var form = formidable({keepExtensions:true,multiples:true,uploadDir:dir}) //recieve upload form

        form.parse(req,(err,fields,files)=>{
            if (err){  //rename and direct the file into fs
                res.json({error:"Error occur uploading the files"})
            }
            new_name = path.join(path.dirname(files.clipInfo.path),Date.now()/1000 + path.extname(files.clipInfo.path))
            fs.renameSync(files.clipInfo.path,new_name)
            res.json({msg:"Upload Successful",path1:files.clipInfo.path})

            var post = {id:docCount+1,path:files.clipInfo.path,description:"Temp"}
            postCollection.insertOne(post);
        })
    })
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