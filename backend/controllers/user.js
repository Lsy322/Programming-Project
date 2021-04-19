var user = require('../models/user.js');
var request = require("request");
var mongoose = require("mongoose");
const { json } = require('body-parser');

const db = mongoose.connect("mongodb+srv://mark:hkccpp@clips.ipkvx.mongodb.net/clips?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
const client = mongoose.connection;
const userCollection = client.collection("user")
const postCollection = client.collection("posts")

//#region token
const getToken = () =>{
    var request = require("request");
    return new Promise(function (resolve,reject){
        var options = { method: 'POST',
        url: 'https://dev-1ksx3uq3.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"BdIdNXziWgcAJcVKchqH6uvuxhx5Gi3R","client_secret":"1e57081D2ktIty8o5zEAv9s38Vb788Z3fAxLbHuGGQAdimnKWURMlSR75Xg2_3Xx","audience":"https://dev-1ksx3uq3.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };
      
      request(options, function (error, response, body) {
        if (error) {
            reject(error)
        }else{
            resolve(JSON.parse(body))
        }
      });
    })  
}
//#endregion

//#region fetch
const Mutifetch = (friendArray,TOKEN) =>{
    var fetchedArray = []
    return new Promise(function (resolve,reject){
        for (let index = 0; index < friendArray.length; index++) {
            var element = friendArray[index];
            if (element.indexOf("auth0|") == -1){
                element = "auth0|" + element
            }
            var options = { method: 'GET',
            url: 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/'+ element,
            headers: { 'authorization':'Bearer ' + TOKEN, 'content-type': 'application/json' },
            body: {},
            json:true};
    
            request(options, function (error, response, body) {
            if (error) {
                reject(error)
            }else{
                fetchedArray.push(body)
                if (fetchedArray.length == friendArray.length){
                    console.log(fetchedArray.length)
                    resolve(fetchedArray)
                }
            }
            }) 
        } 
    })
}
//#endregion

module.exports =  
{
getUser: async (req,res)=>{
    if (!mongoose.isValidObjectId(req.params.id)){
        res.json({message:"Can't parse such id"})
        return;
    }
    var doc = await userCollection.findOne({_id:mongoose.Types.ObjectId(req.params.id)})
    getToken().then((data)=>{
        TOKEN = data.access_token
        if (doc != null){
            var options = { method: 'GET',
            url: 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/'+ "auth0|" + req.params.id,
            headers: { 'authorization':'Bearer ' + TOKEN, 'content-type': 'application/json' },
            body: {},
            json:true};
             request(options, function (error, response, body) {
                if (error) throw new Error(error);
                body.friends = doc.friends;
                body.friendRequest = doc.friendRequest;
                res.json(body);
            });
        }else{
            res.json({message:"No such user"})
        }
    })
},
addFriendRequest: async (req,res)=>{
    try{
        const rkey = req.body.RecieveId
        const skey = req.body.SendId
        userCollection.updateOne({_id:mongoose.Types.ObjectId(rkey)},{$push:{friendRequest:skey}})
        res.json({message:"Request added"})
    }catch (err){
        res.json(err)
    }
},
removeFriendRequest: async(req,res)=>{
    try{
        const rkey = req.body.RecieveId
        const skey = req.body.RemoveId
        userCollection.updateOne({_id:mongoose.Types.ObjectId(rkey)},{$pull:{friendRequest:skey}})
        res.json({message:"Request removed"})
    }catch(err){
        res.json(err)
    }
},
acceptFriendRequest: async (req,res)=>{
    try{
        const uid = req.body.uid
        const aid = req.body.acceptedId
        userCollection.updateOne({_id:mongoose.Types.ObjectId(uid)},{$push:{friends:'auth0|'+ aid},$pull:{friendRequest:aid}})
        userCollection.updateOne({_id:mongoose.Types.ObjectId(aid)},{$push:{friends:'auth0|'+uid}})
        res.json({message:"Friend request accepted"})
    }catch (err){
        res.json(err)
    }
},
removeFriend: async (req,res)=>{
    try{
        const uid = req.body.uid
        const aid = req.body.removeId
        userCollection.updateOne({_id:mongoose.Types.ObjectId(uid)},{$pull:{friends:'auth0|'+ aid}})
        userCollection.updateOne({_id:mongoose.Types.ObjectId(aid)},{$pull:{friends:'auth0|'+uid}})
        res.json({message:"Friend removed"})
    }catch (err){
        res.json(err)
    }
},
deleteUser: async (req,res)=>{
    try{
        if (!mongoose.isValidObjectId(req.params.id)){
            res.json({message:"Can't parse such id"})
            return;
        }
        var doc = await userCollection.findOne({_id:mongoose.Types.ObjectId(req.params.id)})
        if (doc != null){
            await userCollection.deleteOne({_id:mongoose.Types.ObjectId(req.params.id)})
            await postCollection.deleteMany({"author.sub":"auth0|" + req.params.id})
            userCollection.updateMany({friends:"auth0|" + req.params.id},{$pull:{friends:'auth0|'+req.params.id}})
            userCollection.updateMany({friendRequest:req.params.id},{$pull:{friendRequest:req.params.id}})
            getToken().then((data)=>{
                TOKEN = data.access_token
                var options = { method: 'DELETE',
                url: 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/'+ "auth0|" + req.params.id,
                headers: { 'authorization':'Bearer ' + TOKEN, 'content-type': 'application/json' },
                body: {},
                json:true};
                    request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    res.json({message:"Deleted User"});
                });
            })
            
        }else{
            res.json({message:"No such user"})
        }
    }catch (err){
        res.json(err)
    }
},
getFriends: async (req,res)=>{
    var doc = await userCollection.findOne({_id:mongoose.Types.ObjectId(req.params.id)})
    getToken().then((data)=>{
        Mutifetch(doc.friends,data.access_token).then((data)=>{
            res.json(data)
        })
    })
},
getFriendRequest: async (req,res) =>{
    var doc = await userCollection.findOne({_id:mongoose.Types.ObjectId(req.params.id)})
    getToken().then((data)=>{
        Mutifetch(doc.friendRequest,data.access_token).then((data)=>{
            res.json(data)
        })
    })
}
};