var mongoose = require('../db-connection/mongo');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type: String, index:true ,unique: true},
    name: String,
    profilePicUrl: String
});

userSchema.plugin(uniqueValidator);

var user = mongoose.model('user', userSchema);

module.exports = user;