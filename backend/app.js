var express = require('express')
var app = express()
var formidable = require('formidable')
var path = require('path')
var fs = require('fs')

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
            var post = {    //Post structure
                id:nextId,
                path:new_name,
                description:fields.description
            } 
            postCollection.insertOne(post); //Store info into db
            docCount++

            res.json({msg:"Upload Successful",path1:new_name,id:nextId}) //Return
        })
    })
})

//DeletePost
app.post('/deletePost/:id' , (req,res) => {
    if (!req.params.id){
        res.json({messsage:'Error deleting post'})
    }
    if (req.params.id == "all"){     //ONLY FOR DEVOLOPING PURPOSES
        for (var i=1;i <= docCount;i++){
            postCollection.findOneAndDelete({id:i.toString()},(err,docs,result)=>{
                if (err || docs.value == null){
                    return
                }else{
                   fs.unlinkSync(docs.value.path);
                }
           })  
        }
        res.json({msg:"deleted all files"})
    }else{
        postCollection.findOneAndDelete({id:req.params.id},(err,docs,result)=>{
            if (err || docs.value == null){
                res.json({msg:"No result found"})
                return
            }else{
               fs.unlinkSync(docs.value.path);
               res.json({msg:"Deleted post",doc:docs,result:result})
            }
       })  
    } 
})


app.listen(5000, () => {
    console.log('Server running on port 5000...')
})