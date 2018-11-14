const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/local', function(){
    console.log("Connected to Mongo");
});

 module.exports = mongoose
