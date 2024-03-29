var request = require("request");
var authApi = require("./auth0.js")

const postCollection = require("../models/postMessage.js")
const friendCollection = require("../models/friends.js")
const repostCollection = require("../models/Repost.js");
const messageCollection = require("../models/Messages.js")
const chatroomCollection = require("../models/ChatRooms.js")
const { SinglefetchWithdata } = require("./auth0.js");

const userFetch = authApi.getUserList
const Singlefetch = authApi.Singlefetch

var userList = [];

const fetchUser = async (userid) =>{
    return new Promise(async function (resolve,reject){
        var key = userList.find(element => element.user_id === userid)
        if (userid == "refetch"){
            userFetch()
            .then(async (data)=>{
                userList = data
                for (let i = 0;i<userList.length;i++){
                    var check = await friendCollection.findOne({user_id:userList[i].user_id})
                    if (check == null){
                        var newdoc = new friendCollection({user_id:userList[i].user_id})
                        await newdoc.save()
                        console.log("Create new document in friend collection with user_id " + userList[i].user_id)
                    }
                }
                console.log("Refetched Updated user list")
            })
        }
        else if (userList.length == 0){  //first init
            console.log("List init")
            userFetch()
            .then(async (data)=>{
                userList = data
                for (let i = 0;i<userList.length;i++){
                    var check = await friendCollection.findOne({user_id:userList[i].user_id})
                    if (check == null){
                        var newdoc = new friendCollection({user_id:userList[i].user_id})
                        await newdoc.save()
                        console.log("Create new document in friend collection with user_id " + userList[i].user_id)
                    }
                }
                var result = userList.find(element => element.user_id === userid)
                var doc = await friendCollection.findOne({user_id:userid})
                if (result != undefined){
                    result.user_metadata = {friends:doc.friends,friendRequest : doc.friendRequest}
                }
                resolve(result)
            })
        }else if (key == undefined){  //If user not exist try update list once
            console.log("Refetching User")
            userFetch()
            .then(async (data)=>{
                userList = data
                for (let i = 0;i<userList.length;i++){
                    var check = await friendCollection.findOne({user_id:userList[i].user_id})
                    if (check == null){
                        var newdoc = new friendCollection({user_id:userList[i].user_id})
                        await newdoc.save()
                        console.log("Create new document in friend collection with user_id " + userList[i].user_id)
                    }
                }
                var result = userList.find(element => element.user_id === userid)
                var doc = await friendCollection.findOne({user_id:userid})
                if (result != undefined){
                    result.user_metadata = {friends:doc.friends,friendRequest : doc.friendRequest}
                }
                resolve(result)
            })
        }
        else{   //normal case
            console.log("User found")
            await friendCollection.findOne({user_id:userid}).then((doc)=>{
                if (key != undefined){
                    key.user_metadata = {friends:doc.friends,friendRequest : doc.friendRequest}
                }
                resolve(key)
            })

        }
    })
}

const fetchUserByEmail = async (queryEmail)=>{
    return new Promise(async (resolve,reject)=>{
        var key = userList.find(element => element.email === queryEmail)
        
        await friendCollection.findOne({user_id:key.user_id}).then((doc)=>{
            if (key != undefined){
                key.user_metadata = {friends:doc.friends,friendRequest : doc.friendRequest}
            }
            resolve(key)
        })
    })
}

const routineFetching = () =>{
    userFetch().then((data)=>{
        userList = data
        console.log("Routine Refetch")
        setTimeout(routineFetching,300000)
        return;
    })
}

setTimeout(routineFetching,300000)



module.exports =  
{
    fetchUser,              //Query User function
    fetchUserByEmail,       //Query User function
getUser: async (req,res)=>{
    var key = req.params.id
    fetchUser(key)
    .then((result)=>{
        if (result == undefined){
            res.json({message:"no such user"})
        }else{
            res.json(result)
        }
    })

},
addFriendRequest: async (req,res)=>{
    const rkey = req.body.RecieveId
    const skey = req.body.SendId
        
        fetchUser(rkey)
        .then(async (result)=>{
            if (result == undefined){
                res.json({message:"No such user"})
                return
            }
            var key1 = result.user_metadata.friendRequest.indexOf(skey)
            var key2 = result.user_metadata.friends.indexOf(skey)
            if (key1 != -1){
                res.json({message:"Request already sent"})
                return;
            }
            if (key2 != -1){
                res.json({message:"The target user is already added as friend"})
                return;
            }
            await friendCollection.updateOne({user_id:rkey},{$push:{friendRequest:skey}})
            res.json({message:"Added request"})
        })
},
removeFriendRequest: async(req,res)=>{
        const rkey = req.body.RecieveId
        const skey = req.body.RemoveId
        fetchUser(rkey)
        .then(async (result)=>{
            if (result == undefined){
                res.json({message:"No such user"})
                return
            }
            var array = result.user_metadata.friendRequest
            var key = array.indexOf(skey)
            if (key == -1){
                res.json({message:"No such request"})
                return;
            }
            await friendCollection.updateOne({user_id:rkey},{$pull:{friendRequest:skey}})
            res.json({message:"Removed request"})
        })
},
acceptFriendRequest: async (req,res)=>{
        const uid = req.body.uid
        const aid = req.body.acceptedId
        fetchUser(uid)
        .then(async (result)=>{
            if (result == undefined){
                res.json({message:"No such user"})
                return
            }
            var array = result.user_metadata.friendRequest
            var key = array.indexOf(aid)
            if (key == -1){
                res.json({message:"No such request to be accepted"})
                return;
            }
            await friendCollection.updateOne({user_id:uid},{$pull:{friendRequest:aid},$push:{friends:aid}})
            await friendCollection.updateOne({user_id:aid},{$push:{friends:uid}})
            res.json({message:"Added Friend"})
        })
},
removeFriend: async (req,res)=>{
        const uid = req.body.uid
        const aid = req.body.removeId
        fetchUser(uid)
        .then(async (result)=>{
            console.log(result)
            var array = result.user_metadata.friends
            var key = array.indexOf(aid)
            if (key == -1){
                res.json({message:"No such friend to be removed"})
                return;
            }
            await friendCollection.updateOne({user_id:uid},{$pull:{friends:aid}})
        })
        fetchUser(aid)
        .then(async (result)=>{
            var array = result.user_metadata.friends
            var key = array.indexOf(uid)
            if (key == -1){
                res.json({message:"No such friend to be removed"})
                return;
            }
            await friendCollection.updateOne({user_id:aid},{$pull:{friends:uid}})
            res.json({message:"Removed Friend"})
        })

},
deleteUser: async (req,res)=>{
    var key = req.params.id
    Singlefetch(key,'DELETE', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/')
    .then(async (result)=>{
        await postCollection.deleteMany({"author.sub":key})
        await repostCollection.deleteMany({"author.sub":key})
        await friendCollection.deleteOne({user_id:key})
        await friendCollection.updateMany({friendRequest:key},{$pull:{friendRequest:key}})
        await friendCollection.updateMany({friends:key},{$pull:{friends:key}})
        fetchUser("refetch")
        res.json("deleted User")
    })
},
getFriends: async (req,res)=>{
    var key = req.params.id
    var resultArray = []
    fetchUser(key)
    .then((result)=>{
        if (result == undefined){
            res.json({message:"No such user"})
            return
        }
        if (result.user_metadata.friends.length == 0){
            res.json({message:"No friend to fetch"})
            return
        }
        for (let i = 0; i < result.user_metadata.friends.length;i++){
            fetchUser(result.user_metadata.friends[i])
            .then((data)=>{
                resultArray.push(data)
                if (i == result.user_metadata.friends.length - 1){
                    res.json(resultArray)
                }
            })
        }
    })  
},
getFriendRequest: async (req,res) =>{
    var key = req.params.id
    var resultArray = []
    fetchUser(key)
    .then((result)=>{
        if (result == undefined){
            res.json({message:"No such user"})
            return
        }
        if (result.user_metadata.friendRequest.length == 0){
            res.json({message:"No request to fetch"})
            return
        }
        for (let i = 0; i < result.user_metadata.friendRequest.length;i++){
            fetchUser(result.user_metadata.friendRequest[i])
            .then((data)=>{
                resultArray.push(data)
                if (i == result.user_metadata.friendRequest.length - 1){
                    res.json(resultArray)
                }
            })
        }
    })  
},
changeNickname: async (req,res)=>{
    var key = req.body.id
    var newName = req.body.newName
    SinglefetchWithdata(key,'PATCH','https://dev-1ksx3uq3.us.auth0.com/api/v2/users/',{"nickname":newName})
    .then(async (result)=>{
        fetchUser("refetch")
        res.json({message:"Changed Nickname"})
    })
}
};