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
    }).catch(err => {

    })
}

function getGoogleUserData(tokendata ,cb){
    
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
            
            if(data.statusCode === 200){
                let obj = Object.assign(tokendata, JSON.parse(data.text));
                
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
            
        })
}

function saveGoogleData(data, cb){
    let obj = {
        name: data.name,
        email: data.email,
        picture: data.picture
    }
    
    userDao.addRecord(data.name,data.email,data.picture)
        .then(newdata =>{
            return cb(null,newdata.data)
        }).catch(err => {
            
            return cb(null,err.data)
        })
}
function sendResponse(res, data, cb){

    let jwt_token = jwt.sign({token: data}, 'ankit');
    let responseObj = {
        jwtToken : jwt_token,
    }
    res.send(responseObj);
    cb(null);
}


module.exports = {
    loginWithGoogle
}