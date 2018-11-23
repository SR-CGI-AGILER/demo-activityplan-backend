const app = require('express')();
const activity = require('./api/activity/index')
const scheduled = require('./api/scheduled/index')

const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http').Server(app);
const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/api/v1',activity)
app.use('/api/v1',scheduled)

http.listen(port, function () {
    console.log("listening on port:" + port);
});
