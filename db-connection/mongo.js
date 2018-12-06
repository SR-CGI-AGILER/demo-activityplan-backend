const mongoose = require('mongoose');
const ENV = require('../config/environment');

mongoose.connect(`mongodb://${ENV.mongo}:27017/local`, function(err){
    if (err) {
        throw err
    }else {
        console.log("Connected to Mongo");
    }
});

module.exports = mongoose
