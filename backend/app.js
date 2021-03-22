var express = require('express')
var app = express()
var formidable = require('formidable')
var path = require('path')
var fs = require('fs')

var cors = require('cors');
app.use(cors());

//Require Database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect("mongodb+srv://mark:hkccpp@clips.ipkvx.mongodb.net/clips?retryWrites=true&w=majority")
.then(()=> {console.log("Connected database")},
err=>{console.log("Error connecting to database")})

var db = mongoose.connection;
var postCollection = db.collection("posts")
var userCollection = db.collection("users")

const user = new mongoose.Schema({
    userName:'string',
    password : 'string',
    email : 'string'
})

//Variable
var dir = "UploadDir"
var docCount = 0 


//Default
app.get('/', (req,res) => {
    res.send('hello world')
})

//#region Posts

//ListPosts
app.get('/posts', (req,res) =>{
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
app.post('/post/:id/delete' , (req,res) => {
    if (!req.params.id){
        res.json({messsage:'Error deleting post'})
    }
    if (req.params.id == "all"){     //ONLY FOR DEVOLOPING PURPOSES
        postCollection.deleteMany({});
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
//#endregion

//#region Users
app.put('/newUser', (req,res)=>{
    var form = formidable({keepExtensions:true,multiples:true,uploadDir:dir}) //recieve upload form
    form.parse(req,(err,fields,files)=>{ 
        const Testuser = new mongoose.model('user',user)
        var newUser = new Testuser({userName:'Test'})
        newUser.save((err)=>{
            if (err){
                console.log(err)
                return;
            }
        });
        res.json({msg:'added user'})
    })
})

app.get('/listUser',(req,res)=>{
    userCollection.find({}).toArray((err,result)=>{
        if (err) throw err
        res.json({users:result})
    })
})

app.post('/user/:id/delete',(req,res)=>{
    console.log(req.params.id)
    userCollection.find
    userCollection.findOneAndDelete({_id:req.params.id},(err,docs,result)=>{
        if (err||docs == null){
            res.json({msg:'No such user'})
            return;
        }else{
            res.json({msg:"deleted user",doc:docs})
        }
    })
})
//#endregion

app.listen(5000, () => {
    console.log('Server running on port 5000...')
})