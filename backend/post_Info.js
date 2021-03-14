var mongoose = require('mongoose');

//clip_Info schema
var post_infoSchema = new mongoose.Schema({
    path: String,
    clipName: String
});

var post = mongoose.model("post",post_infoSchema)