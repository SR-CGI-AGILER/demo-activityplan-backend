var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    createdAt: Date,
    initiative: String,
    initiativeId: String,
    // members: [],
    
    createdBy: {},
    tasks: [{
        text:String,
        projectName: String,
        due_date: Date,
        owner: String,
        status: String
    }]     
});

var activity = mongoose.model('activity', activitySchema);

module.exports = activity;