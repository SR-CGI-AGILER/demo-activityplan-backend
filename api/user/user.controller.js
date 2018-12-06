const userDao = require('../../dao/user/user.dao');
const request = require('superagent');
// const keys = require('../../config/keys');
const async = require('async');
const jwt = require('jsonwebtoken');
// const uuidv4 = require('uuid/v4');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var express = require('express');
var ENV = require('../../config/environment');

function loginWithGoogle(req,res){
    // console.log("GOOEL")
    async.waterfall([
        async.apply(getGoogleToken, req, res),
        getGoogleUserData,
        saveGoogleData,
        async.apply(sendResponse, res)
    ], function(err, results){

    });   
}

function getGoogleToken(req, res, cb){
    
    request
    .post('https://www.googleapis.com/oauth2/v3/token')
    .set({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    })
    .send({
      'code': req.body.code,
      'redirect_uri': `http://${ENV.host}/torii/redirect.html`,
      'client_id': '1053797418071-cb49noe362osfv37v0jc25bkvqbum5qp.apps.googleusercontent.com',
      'client_secret': '7o6XfydcFK7neYRbOJs2Kuze',
      'grant_type': 'authorization_code',
      'scope': '',

    }).then(data => {
        
        if(data.body.access_token){
            return cb(null, data.body);
        }
        else{
            res.status().send({
                payload: {
                    msg:'Unauthorized'
                }
            })
        }
    })
}

function getGoogleUserData(tokendata ,cb){
    // console.log( "inside getGoogleUserData")
    let access_token = tokendata.access_token;
    
    // if(true){
        request
        .get(`https://www.googleapis.com/oauth2/v2/userinfo`)
        .set({
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Bearer ${access_token}`
        })
        .send({
        })
        .then((data)=>{
            // console.log(err,"aftereturnr getdata");
            if(data.statusCode === 200){
                let obj = Object.assign(tokendata, JSON.parse(data.text));
                // let jwt_token = jwt.sign({token: JSON.parse(data.text)}, 'ankit');
                // console.log(jwt_token);
                return cb(null, obj);
            }
            else{
                res.status('401').send({
                    payload:{
                        msg:'Unauthorized'
                    }
                })
            }
        }).catch(err => { 
            console.log(err);
        })
    // }
}

function saveGoogleData(data, cb){
    // console.log(arg2);
    // console.log(JSON.parse(data.text).name, 'in save data')
    // let userdata = JSON.parse(data.text);
    //console.log(userdata);
    let obj = {
        name: data.name,
        email: data.email,
        picture: data.picture
        // id: uuidv4()
    }
    // console.log(obj);
    // let jwt_token = jwt.sign({token: obj}, 'ankit');
    // let responseObj = {
    //     jwtToken : jwt_token
    //     // userData : obj
    // }
    userDao.addRecord(data.name,data.email,data.picture)
        .then(newdata =>{
            // console.log(newdata);
            return cb(null,newdata.data)
        }).catch(err => {
            console.log(err.data,"ADD");
            // res.send("ERROR");
            return cb(null,err.data)
        })
}
function sendResponse(res, data, cb){
    // // console.log(data.jwtToken;
    
    // // res.cookie('cookie','helloSwarnim', { secure:false, maxAge:120000, httpOnly: false }).send(data);
    // // res.end('wow');
    // console.log(data.userdata, "sendResponse");
    console.log(data,"SEND");
    let jwt_token = jwt.sign({token: data}, 'ankit');
    let responseObj = {
        jwtToken : jwt_token,
        // userdata : data
    }
    res.send(responseObj);
    cb(null);
}


module.exports = {
    loginWithGoogle
}