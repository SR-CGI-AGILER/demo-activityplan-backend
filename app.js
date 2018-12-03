const app = require('express')();
const activity = require('./api/activity/index');
const teamCopy = require('./api/teamCopy/index');
// const activity = require('./api/activity/index')
const backlog = require('./api/backlog/index');
// const activity = require('./api/activity/index')
const scheduled = require('./api/scheduled/index')
const initiativeusermapping = require('./api/initiative-user/index')
const userinitiativemapping = require('./api/user-initiative/index')
const user = require('./api/user/index');
const path = require('path');

const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http').Server(app);
const port = process.env.PORT || 4000;
const ENV = require('./config/environment');


/**
 * Not to use cors in the PRODUCTION
 */
// if (process.ENV === 'dev') {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        next();
    }); 
// }
// console.log(path.resolve(__dirname , '../' , 'agiler-ui/dist/'))
// app.use('/', require('express').static(path.resolve(__dirname ,  './dist')));

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(ENV.apiEndPoint,activity)
app.use(ENV.apiEndPoint,teamCopy)
app.use(ENV.apiEndPoint,backlog)
app.use(ENV.apiEndPoint,scheduled)
app.use(ENV.apiEndPoint,user)
app.use(ENV.apiEndPoint,initiativeusermapping)
app.use(ENV.apiEndPoint,userinitiativemapping)

http.listen(port, function () {
    console.log("listening on port:" + port);
});
