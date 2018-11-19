var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    date : Date,
    tasks : { text:String,
            projectName: String,
            dueDate: Date,
            owner: String,
            backlog: Boolean,
            scheduled: Date,
            scheduled_On: Date,
            status: String }
});

var activity = mongoose.model('activity', activitySchema);

module.exports = activity;