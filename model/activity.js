var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    text: String,
    projectName: String,
    owner: String
});

var activity = mongoose.model('activity', activitySchema);

module.exports = activity;