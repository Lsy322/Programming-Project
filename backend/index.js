var express = require('express');
var mongoose = require("mongoose");
var cors = require("cors");
var request = require("request")

//router Import
var postRoutes = require('./routes/posts.js');
var userRoutes = require('./routes/user.js')



const app = express();
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit:"30mb", extended: true}));
app.use(cors()); 

app.use('/post',postRoutes);
app.use('/user',userRoutes);

const CONNECTION_URL = "mongodb+srv://mark:hkccpp@clips.ipkvx.mongodb.net/clips?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, () => console.log('Server running on port ' + PORT)))
.catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);
