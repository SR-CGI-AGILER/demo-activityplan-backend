const mongoose = require('mongoose');

mongoose.connect('mongodb://172.23.239.177:27017/local', function(){
    
    console.log("Connected to Mongo");
});

module.exports = mongoose
