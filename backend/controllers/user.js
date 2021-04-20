var request = require("request");
var mongoose = require("mongoose");
var authApi = require("./auth0.js")

const db = mongoose.connect("mongodb+srv://mark:hkccpp@clips.ipkvx.mongodb.net/clips?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
const client = mongoose.connection;
const postCollection = client.collection("posts")

const prefix = "auth0|"

const getToken = authApi.getToken
const Singlefetch = authApi.Singlefetch
const SinglefetchWithdata = authApi.Mutifetch
const Mutifetch = authApi.Mutifetch

module.exports =  
{
getUser: async (req,res)=>{
    var key = req.params.id
    getToken().then((data)=>{
        Singlefetch(key, data.access_token, 'GET', "https://dev-1ksx3uq3.us.auth0.com/api/v2/users/")
        .then((result)=>{
            res.json(result)
        })
    })
},
addFriendRequest: async (req,res)=>{
    const rkey = prefix + req.body.RecieveId
    const skey = prefix + req.body.SendId
        getToken()
        .then((data)=>{
            Singlefetch(rkey, data.access_token,'GET', "https://dev-1ksx3uq3.us.auth0.com/api/v2/users/")
            .then((result)=>{
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
                SinglefetchWithdata(rkey, data.access_token,'PATCH', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/',{user_metadata:{friendRequest:result.user_metadata.friendRequest}})
                .then((endResult)=>{
                    res.json(endResult)
                })
            })
        })
},
removeFriendRequest: async(req,res)=>{
        const rkey = prefix + req.body.RecieveId
        const skey = prefix + req.body.RemoveId
        getToken()
        .then((data)=>{
            Singlefetch(rkey, data.access_token,'GET', "https://dev-1ksx3uq3.us.auth0.com/api/v2/users/")
            .then((result)=>{
                var array = result.user_metadata.friendRequest
                var key = array.indexOf(skey)
                if (key == -1){
                    res.json({message:"No such request"})
                    return;
                }
                array.splice(key,1)
                SinglefetchWithdata(rkey, data.access_token,'PATCH', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/',{user_metadata:{friendRequest:array}})
                .then((endResult)=>{
                    res.json(endResult)
                })
            })
        })
},
acceptFriendRequest: async (req,res)=>{
        const uid = prefix + req.body.uid
        const aid = prefix + req.body.acceptedId

        getToken()
        .then((data)=>{
            Singlefetch(uid, data.access_token,'GET', "https://dev-1ksx3uq3.us.auth0.com/api/v2/users/")
            .then((result)=>{
                var array = result.user_metadata.friendRequest
                var key = array.indexOf(aid)
                if (key == -1){
                    res.json({message:"No such request to be accepted"})
                    return;
                }
                array.splice(key,1)
                result.user_metadata.friends.push(aid)
                SinglefetchWithdata(uid, data.access_token,'PATCH', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/',{user_metadata:{friends:result.user_metadata.friends,friendRequest:array}})
                .then((endResult)=>{
                    res.json(endResult)
                })
            })
            Singlefetch(aid, data.access_token,'GET', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/')
            .then((result)=>{
                result.user_metadata.friends.push(uid)
                SinglefetchWithdata(aid, data.access_token,'PATCH', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/',{user_metadata:{friends:result.user_metadata.friends}})
            })
        })
},
removeFriend: async (req,res)=>{
        const uid = prefix + req.body.uid
        const aid = prefix + req.body.removeId

        getToken()
        .then((data)=>{
            Singlefetch(uid, data.access_token, 'GET', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/')
            .then((result)=>{
                var array = result.user_metadata.friends
                var key = array.indexOf(aid)
                if (key == -1){
                    res.json({message:"No such friend to be removed"})
                    return;
                }
                array.splice(key,1)
                SinglefetchWithdata(uid, data.access_token,'PATCH', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/',{user_metadata:{friends:array}})
                .then((endResult)=>{
                    res.json(endResult)
                })
            })
            Singlefetch(aid, data.access_token,'GET', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/')
            .then((result)=>{
                var array = result.user_metadata.friends
                var key = array.indexOf(uid)
                if (key == -1){
                    res.json({message:"No such friend to be removed"})
                    return;
                }
                array.splice(key,1)
                SinglefetchWithdata(uid, data.access_token,'PATCH', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/',{user_metadata:{friends:array}})
            })
        })
},
deleteUser: async (req,res)=>{
    var key = prefix + req.params.id
    getToken()
    .then((data)=>{
        Singlefetch(key, data.access_token,'DELETE', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/')
        .then((result)=>{
            res.json(result)
        })
    })
    postCollection.deleteMany({"author.sub":req.params.id})
},
getFriends: async (req,res)=>{
    var key = prefix + req.params.id
    getToken()
    .then((data)=>{
        Singlefetch(key,data.access_token,'GET', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/')
        .then((result)=>{
            Mutifetch(result.user_metadata.friends, data.access_token, 'GET', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/')
            .then((resultArray)=>{
                res.json(resultArray)
            })
        })  
    })
},
getFriendRequest: async (req,res) =>{
    var key = prefix + req.params.id
    getToken()
    .then((data)=>{
        Singlefetch(key,data.access_token,'GET', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/')
        .then((result)=>{
        Mutifetch(result.user_metadata.friendRequest, data.access_token, 'GET', 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/')
        .then((resultArray)=>{
                res.json(resultArray)
            })
        })
    })
}
};