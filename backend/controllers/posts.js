var PostMessage = require('../models/postMessage.js');
var ObjectId = require('mongodb').ObjectID;

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
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch (err){
        res.status(409).json({msg:"error Message"});
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
        const postMessage = await PostMessage.find({permission:{"$in":["all",req.body.sub]}}).sort({createAt:-1})
        res.json(postMessage)
    }catch (err){
        res.json({message:err})
    }
}
};