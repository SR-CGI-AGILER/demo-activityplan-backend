var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;

var initiativeusermappingSchema = new Schema({
    initiative: {
        id : String,
        name : String
    },
    members:[
        {
            name : String,
            email : String,
            profilePicUrl : String,
            owner: Boolean
        }
    ]
})

var initiativeusermapping = mongoose.model('initiativeusermapping',initiativeusermappingSchema)

module.exports = initiativeusermapping