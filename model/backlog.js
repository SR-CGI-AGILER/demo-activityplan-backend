var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;

var backlogSchema = new Schema({
            initiative : String,
            initiativeId : String,
            tasks: [
                     {
                        text : String,
                        projectName : String,
                        due_date : Date,
                        owner : String,
                        status: String
                     } 
                   ],
            members: [
               {
                  name : String,
                  email : String, 
                  profilePicUrl: String
               }
            ]
            });

var backlog = mongoose.model('backlog', backlogSchema);

module.exports = backlog;