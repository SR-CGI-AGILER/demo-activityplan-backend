const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/local', function(err){
    if (err) {
        throw err
    }else {
        console.log("Connected to Mongo");
    }
});

module.exports = mongoose
