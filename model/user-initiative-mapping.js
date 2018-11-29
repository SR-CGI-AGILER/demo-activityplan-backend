var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;

var userinitiativemappingSchema = new Schema({
    email: String,
    initiative: [
        {
            initiativeId: String,
            initiativeName: String
        }
    ]
})

var userinitiativemapping = mongoose.model('userinitiativemapping',userinitiativemappingSchema)

module.exports = userinitiativemapping