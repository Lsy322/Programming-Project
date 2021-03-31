var PostMessage = require('../models/postMessage.js');

module.exports =  
{getPosts : async (req, res) => {
    try{
        const postMessage = await PostMessage.find();
        console.log(postMessage);
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
            await PostMessage.deleteOne({id:req.params.id})
            res.json({message:"Deleted Post"})
        }catch (err){
            res.json({message:err});
        }
    } 
    }
};