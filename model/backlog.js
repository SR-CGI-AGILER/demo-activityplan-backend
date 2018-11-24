var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;

var backlogSchema = new Schema({
            initiative : String,
            tasks: [
                     {
                        text : String,
                        projectName : String,
                        due_date : Date,
                        owner : String,
                        status: String
                     } 
                   ]
            });

var backlog = mongoose.model('backlog', backlogSchema);

module.exports = backlog;