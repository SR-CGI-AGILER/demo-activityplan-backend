var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;

var initiative = new Schema({
    initiativeId: String,
    initiativeName: String
}, {_id: false})

var userinitiativemappingSchema = new Schema({
    email: String,
    initiative: [initiative]
})

var userinitiativemapping = mongoose.model('userinitiativemapping',userinitiativemappingSchema)

module.exports = userinitiativemapping