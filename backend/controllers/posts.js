var PostMessage = require('../models/postMessage.js');
// var user = require('../models/user.js');
const { post } = require('../routes/user.js');
var mongoose = require("mongoose")
const db = mongoose.connect("mongodb+srv://mark:hkccpp@clips.ipkvx.mongodb.net/clips?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
const client = mongoose.connection;
const user = client.collection("user")

module.exports =  
{getPosts : async (req, res) => {
    try{
        const postMessage = await PostMessage.find().sort({createAt:-1});
        res.status(200).json(postMessage);
    }catch (err){
        res.status(404).json({message: "error message"});
    }
},

createPost : async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    newPost.createAt = Date.now();
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch (err){
        res.status(409).json(err);
    }
},

deletePost : async (req,res) =>{
    if (!req.params.id){
        res.json({messsage:'Error deleting post'})
    }
    if (req.params.id == "all"){     //ONLY FOR DEVOLOPING PURPOSES
        await PostMessage.deleteMany({});
        res.json({msg:"deleted all files"})
    }else{
        try {
            await PostMessage.deleteOne({_id:req.params.id})
            res.json({message:"Deleted Post"})
        }catch (err){
            res.json({message:err});
        }
    } 
},

updatePost: async (req,res)=>{
    try {
        await PostMessage.deleteOne({_id:req.body._id})
    }catch (err){
        res.json({message:err});
    }
    const doc = new PostMessage(req.body);
    try{
        await doc.save()
        res.json({message:"Updated Post"})
    }catch (err){
        res.json({message:err})
    }

},
getPostsById: async (req,res)=>{
    try{
        const postMessage = await PostMessage.find({"author.sub":req.body.sub}).sort({createAt:-1})
        res.json(postMessage)
    }catch (err){
        res.json({message:err})
    }
},
getPreferPost: async (req,res)=>{
    try{
        const uid = req.body.sub
        const currentUser = await user.findOne({_id:mongoose.Types.ObjectId(uid)})
        var requestId = currentUser.friends
        var postMessage = await PostMessage.find({$or:[{"author.sub":uid},{"author.sub":{$in: requestId}},{"permission.viewPermission":false}]}).sort({createAt:-1})
        console.log(postMessage.length)
        res.json(postMessage)
    }
    catch (err){
        res.send(err)
    }
}
};