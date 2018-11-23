var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;

var scheduled = new Schema({
    initiative: { type: String, unique:true },
    tasks:[{ 
        text:String,
        projectName: String,
        due_date: Date,
        owner: String,
        scheduled_For: Number,
        scheduled_On: Number,
        status: String }]
           
});

var scheduled = mongoose.model('scheduled', scheduled);

module.exports = scheduled;