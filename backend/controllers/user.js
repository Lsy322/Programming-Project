var request = require("request");
var mongoose = require("mongoose");
var authApi = require("./auth0.js")

const db = mongoose.connect("mongodb+srv://mark:hkccpp@clips.ipkvx.mongodb.net/clips?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
const client = mongoose.connection;
const postCollection = client.collection("posts")

const prefix = "auth0|"

const Singlefetch = authApi.Singlefetch
const SinglefetchWithdata = authApi.Mutifetch
const Mutifetch = authApi.Mutifetch
const userFetch = authApi.getUserList

var userList = [];

const fetchUser = (userid) =>{
    return new Promise(function (resolve,reject){
        var key = userList.find(element => element.user_id === userid)
        if (userid == "refetch"){
            userFetch()
            .then((data)=>{
                userList = data
                console.log("Refetched Updated user list")
            })
        }
        else if (userList.length == 0){  //first init
            console.log("List init")
            userFetch()
            .then((data)=>{
                userList = data
                resolve(userList.find(element => element.user_id === userid))
            })
        }else if (key == undefined){  //If user not exist try update list once
            console.log("Refetching User")
            userFetch()
            .then((data)=>{
                userList = data
                resolve(userList.find(element => element.user_id === userid))
            })
        }
        else{   //normal case
            console.log("User found")
            resolve(key)
        }
    })
}


module.exports =  
{
getUser: async (req,res)=>{
    var key = prefix + req.params.id
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
    const rkey = prefix + req.body.RecieveId
    const skey = prefix + req.body.SendId
        
        fetchUser(rkey)
        .then((result)=>{
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
            result.user_metadata.friendRequest.push(skey)
            SinglefetchWithdata(rkey,'PATCH', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/',{user_metadata:{friendRequest:result.user_metadata.friendRequest}})
            .then((endResult)=>{
            res.json(endResult)
            fetchUser("refetch")
            })
        })
},
removeFriendRequest: async(req,res)=>{
        const rkey = prefix + req.body.RecieveId
        const skey = prefix + req.body.RemoveId
        fetchUser(rkey)
        .then((result)=>{
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
            array.splice(key,1)
            SinglefetchWithdata(rkey,'PATCH', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/',{user_metadata:{friendRequest:array}})
            .then((endResult)=>{
            res.json(endResult)
            fetchUser("refetch")
            })
        })
},
acceptFriendRequest: async (req,res)=>{
        const uid = prefix + req.body.uid
        const aid = prefix + req.body.acceptedId
        fetchUser(uid)
        .then((result)=>{
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
            array.splice(key,1)
            result.user_metadata.friends.push(aid)
            SinglefetchWithdata(uid,'PATCH', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/',{user_metadata:{friends:result.user_metadata.friends,friendRequest:array}})
            .then((endResult)=>{
                res.json(endResult)
            })
        })
        fetchUser(aid)
        .then((result)=>{
            result.user_metadata.friends.push(uid)
            SinglefetchWithdata(aid,'PATCH', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/',{user_metadata:{friends:result.user_metadata.friends}})
            fetchUser("refetch")
        })
},
removeFriend: async (req,res)=>{
        const uid = prefix + req.body.uid
        const aid = prefix + req.body.removeId
        fetchUser(uid)
        .then((result)=>{
            var array = result.user_metadata.friends
            var key = array.indexOf(aid)
            if (key == -1){
                res.json({message:"No such friend to be removed"})
                return;
            }
            array.splice(key,1)
            SinglefetchWithdata(uid,'PATCH', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/',{user_metadata:{friends:array}})
        })
        fetchUser(aid)
        .then((result)=>{
            var array = result.user_metadata.friends
            var key = array.indexOf(uid)
            if (key == -1){
                res.json({message:"No such friend to be removed"})
                return;
            }
            array.splice(key,1)
            SinglefetchWithdata(uid,'PATCH', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/',{user_metadata:{friends:array}})
            .then((endResult)=>{
                fetchUser("refetch")
                res.json(endResult)
            })
        })

},
deleteUser: async (req,res)=>{
    var key = prefix + req.params.id
    Singlefetch(key,'DELETE', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/')
    .then((result)=>{
        postCollection.deleteMany({"author.sub":req.params.id})
        fetchUser("refetch")
        res.json(result)
    })
},
getFriends: async (req,res)=>{
    var key = prefix + req.params.id
    var resultArray = []
    fetchUser(key)
    .then((result)=>{
        if (result == undefined){
            res.json({message:"No such user"})
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
    var key = prefix + req.params.id
    var resultArray = []
    fetchUser(key)
    .then((result)=>{
        if (result == undefined){
            res.json({message:"No such user"})
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
}
};