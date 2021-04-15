var user = require('../models/user.js');

module.exports =  
{createUser : async (req, res) => {
    try{
        const userInfo = req.body
        const newUser = new user(userInfo)
        await newUser.save()
        res.status(201).json(newUser)
    }catch (err){
        res.status(404).json(err)
    }
},
getUser: async (req,res)=>{
    try{
        const key = req.body.uid
        const userInfo = await user.find({"user.sub":key})
        res.json(userInfo)
    }catch (err){
        res.json(err)
    }
},
addFriendRequest: async (req,res)=>{
    try{
        const rkey = req.body.RecieveId
        const skey = req.body.SendId
        await user.updateOne({"user.sub":rkey},{$push:{friendRequest:skey}})
        res.json({message:"Request added"})
    }catch (err){
        res.json(err)
    }
},
removeFriendRequest: async(req,res)=>{
    try{
        const rkey = req.body.RecieveId
        console.log(rkey)
        const skey = req.body.RemoveId
        console.log(skey)
        await user.updateOne({"user.sub":rkey},{$pull:{friendRequest:skey}})
        res.json({message:"Request removed"})
    }catch(err){
        res.json(err)
    }
},
acceptFriendRequest: async (req,res)=>{
    try{
        const uid = req.body.uid
        const aid = req.body.acceptedId
        await user.updateOne({"user.sub":uid},{$push:{friends:aid},$pull:{friendRequest:aid}})
        await user.updateOne({"user.sub":aid},{$push:{friends:uid}})
        res.json({message:"Friend request accepted"})
    }catch (err){
        res.json(err)
    }
}
};