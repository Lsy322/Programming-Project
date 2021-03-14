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
    postCollection.find({}).toArray((err,result)=>{
        if (err) throw err
        res.json({media:result})
    })
})

//NewPost
app.put('/newPost',(req,res)=>{
    docCount = 0;
    var cursor = postCollection.find({}) //get the database cursor
    cursor.forEach(element => { //get document count
        docCount++
    })
    .then(()=>{
        var nextId = (docCount + 1).toString();
        var form = formidable({keepExtensions:true,multiples:true,uploadDir:dir}) //recieve upload form

        form.parse(req,(err,fields,files)=>{
            if (err){  //rename and direct the file into fs
                res.json({error:"Error occur uploading the files"})
            }
            new_name = path.join(path.dirname(files.clipInfo.path),Date.now()/1000 + path.extname(files.clipInfo.path))
            fs.renameSync(files.clipInfo.path,new_name)

            var post = {id:nextId,path:new_name,description:"Temp"} //Store info into db
            postCollection.insertOne(post);

            res.json({msg:"Upload Successful",path1:new_name,id:nextId}) //Return
        })
    })
})

//DeletePost
app.post('/deletePost/:id' , (req,res) => {
    if (!req.params.id){
        res.json({messsage:'Error deleting post'})
        return
    }
    postCollection.findOne({id:req.params.id},(err,result)=>{
        fs.unlinkSync(result.path);
    })

    postCollection.deleteOne({id:req.params.id},(err,obj)=>{
        if (err) throw err
        res.json({msg:"Clip with id " + req.params.id + " has been deleted"})
    })
})


app.listen(5000, () => {
    console.log('Server running on port 5000...')
})