var user = require('../models/user.js');
var request = require("request");
var mongoose = require("mongoose")

const db = mongoose.connect("mongodb+srv://mark:hkccpp@clips.ipkvx.mongodb.net/clips?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
const client = mongoose.connection;
const userCollection = client.collection("user")

//#region token
var TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5LcjA1dGw0NXNrMVpDc3V4cHdJQyJ9.eyJpc3MiOiJodHRwczovL2Rldi0xa3N4M3VxMy51cy5hdXRoMC5jb20vIiwic3ViIjoicUxXUlJCQVZPdU53ZklaS0R5dnZKclNMNG4yZFhqbENAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTFrc3gzdXEzLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjE4NjgzMjc5LCJleHAiOjE2MTg3Njk2NzksImF6cCI6InFMV1JSQkFWT3VOd2ZJWktEeXZ2SnJTTDRuMmRYamxDIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.MB-JMJ972u9jkRhf_a_iLkRu40OYzr-FHgmaZ2PhWoNo4mRy7Z3vgzo-k6dDet9YUT3ovNvBU3QasiI8Q4XyMhv9lQltSsR26E828f6rIMfDmerEHUI2PodFhXPTxQIOMJKRXsEnwQPud51oW8bUjV_64rkJeJzlSE8w9Fh9o1u-2HWSO4ZdMB1BoMyx_JODgrMNSLCgS6926UDC4MdGtRdGT7fh0DBnf87U5q7e5d-vAGuSimIxAv0G8dSnn3ub0N_Ek5weH4RoUSpyXeD0cbKoKAeNEtR6aKj0cR-EQlqn6FHiocKPmYjuayrJzxBBRCM_UcOpBa5Tg-YCJP1DxA"
//#endregion



module.exports =  
{
getUser: async (req,res)=>{
    var doc = await userCollection.findOne({_id:mongoose.Types.ObjectId(req.params.id)})
    var options = { method: 'GET',
    url: 'https://dev-1ksx3uq3.us.auth0.com/api/v2/users/'+ "auth0|" + req.params.id,
    headers: { 'authorization':'Bearer ' + TOKEN, 'content-type': 'application/json' },
    body: {},
    json:true};
    await request(options, function (error, response, body) {
        if (error) throw new Error(error);
        body.friends = doc.friends;
        body.friendRequest = doc.friendRequest;
        res.send(body);
    });
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
}
};