var express = require('express')
var app = express()

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/backend');
let db = mongoose.connection;

//Check Connection
db.once('open', function(){
    console.log('Connected to mongoDB')
})

//Check for db error
db.on('error',function(err){
    console.log(err);
});

app.get('/', function (req,res){
    res.send('hello world')
})

app.listen(3000, function(){
    console.log('Server running on port 3000...')
})