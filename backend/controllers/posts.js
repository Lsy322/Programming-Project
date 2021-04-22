
var PostMessage = require('../models/postMessage.js');
var RepostMessage = require('../models/Repost.js')

var user = require("./user.js")



const fetchUser = user.fetchUser

const mergePostRepost = (postArray,repostArray)=>{
    return new Promise(async function (resolve,reject){
        var result = []
        while (postArray.length != 0 && repostArray.length != 0){
            if (postArray[0].createAt < repostArray[0].createdAt){
                var repostDoc = repostArray.shift()
                var doc = await PostMessage.findOne({_id:repostDoc.post_id})
                var doc = doc.toObject()
                doc.Type = "Repost"
                doc.repostId = repostDoc._id
                doc.repostAuthor = repostDoc.author
                doc.repostDate = repostDoc.createdAt
                result.push(doc)
            }else{
                result.push(postArray.shift())
            }
        }
        if (postArray.length != 0){
            for (let i = 0; i < postArray.length; i++){
                result.push(postArray[i])
            }
        }
        if (repostArray.length != 0){
            for (let i = 0; i < repostArray.length; i++){
                var repostDoc = repostArray[i]
                var doc = await PostMessage.findOne({_id:repostDoc.post_id})
                var doc = doc.toObject()
                doc.Type = "Repost"
                doc.repostId = repostDoc._id
                doc.repostAuthor = repostDoc.author
                doc.repostDate = repostDoc.createdAt
                result.push(doc)
            }
        }
        resolve(result)
    })
}

module.exports =  
{getPosts : async (req, res) => {
    try{
        var postMessage = await PostMessage.find({"permission.viewPermission":false}).sort({createAt:-1});
        var repostMessage = await RepostMessage.find({}).sort({createdAt:-1})
        mergePostRepost(postMessage,repostMessage)
        .then((result)=>{
            console.log(result.length)
            res.status(200).json(result);
        })
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
    if (req.body.Type == "Repost"){
        try {
            await RepostMessage.deleteOne({_id:req.params.id})
            res.json({message:"Deleted repost"})
        }catch (err){
            res.json({err});
        }
    }else{
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
                res.json({err});
            }
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
            fetchUser(uid)
            .then(async (result)=>{
                if (result == undefined){
                    res.json({message:"No such user"})
                    return
                }
                var requestId = result.user_metadata.friends
                var postMessage = await PostMessage.find({$or:[{"author.sub":uid},{"author.sub":{$in: requestId}},{"permission.viewPermission":false}]}).sort({createAt:-1})
                var repostMessage = await RepostMessage.find({}).sort({createdAt:-1})
                mergePostRepost(postMessage,repostMessage).then((result)=>{
                    console.log(result.length)
                    res.json(result)
                })
            })
    }
    catch (err){
        res.send(err)
    }
},
createRepost: async (req,res)=>{
        const repost = req.body;
        const newRepost = new RepostMessage(repost);
        newRepost.createdAt = Date.now();
    try{
        await newRepost.save();
        var doc = await PostMessage.findOne({_id:newRepost.post_id})
        doc = doc.toObject()
        doc.Type = "Repost"
        doc.repostId = newRepost._id
        doc.repostAuthor = newRepost.author
        doc.repostDate = newRepost.createdAt
        res.json(doc)
    }catch (err){
        res.send(err)
    }
}
};