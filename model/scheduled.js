var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;

var scheduled = new Schema({
    initiative: String,
    initiativeId:String,
    tasks:[{ 
        text:String,
        projectName: String,
        due_date: Date,
        owner: String,
        scheduled_For: Number,
        scheduled_On: Number,
        status: String 
    }],
    member:[{
        name:String,
        email:String,
        profilePicUrl:String
    }]
    
           
});

var scheduled = mongoose.model('scheduled', scheduled);

module.exports = scheduled;