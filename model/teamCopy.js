var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;

var teamCopySchema = new Schema({
    createdAt: Date,
    initiative: String,
    initiativeId: String,
    createdBy: {},
    tasks: [{
        text:String,
        projectName: String,
        due_date: Date,
        owner: String,
        status: String
    }]     
});

var teamCopy = mongoose.model('teamCopy', teamCopySchema);

module.exports = teamCopy;