const initiativeUserDao = require('../../dao/initiative-user/initiative-user.dao')
const userInitiativeDao = require('../../dao/user-initiative/user-initiative.dao');
var uniqid = require('uniqid');


function getUsers(req, res) {
    let temp = {
        id : req.params.initiativeId
    }
    initiativeUserDao.getInitiativeUser(temp).then(doc =>{
        res.status('201').send({
           data:doc.members
        })
    }).catch(err => {
         res.send({message:'something went wrong', 
        error: err})
    })
}

function createNewInitiativeResponse(req,res){
    let temp = {
        name: req.body.name,
        id : uniqid(),
        members: req.body.members 
    }
    initiativeUserDao.createNewInitiative(temp).then(doc => {
        console.log(temp,"FUN!")
        addInitiaviteToUser(req,res,temp.id);
        // res.status('201').send({
        //     data:doc
        //  })
     }).catch(err => {
          res.send({message:'something went wrong', 
         error: err})
     })
 }

function addInitiaviteToUser(req,res,x) {
    console.log("fun","asdsad");
    console.log(req.body,"asdasdasdsad")
    let temp = {
        email: req.body.members.email,
        initiativeId: x,
        initiativeName: req.body.name
    }
    console.log(temp, "function")
    userInitiativeDao.addInitiative(temp).then(function (data) {
        res.send({
            message: "user added to the initiative"
        })
    })
}
function postUsers(req,res){
    let temp = {
        id : req.body.id,
        members: req.body.members 
    }
    initiativeUserDao.addUserToInitiative(temp).then(doc => {
        addInitiaviteToUser(req, res)
    }).catch(err => {
        res.send({message:'soemehfrrj', error: err})
    })
}
function createDefaultInitiativeResponse(req,res){
    let temp = {
        name : req.body.name,
        id:"default000",
        members: req.body.members 
    }
    initiativeUserDao.createDefaultInitiative(temp).then(doc => {
        addInitiaviteToUser(req, res,temp.id)
    }).catch(err => {
        res.send({message:'soemehfrrj', error: err})
    })
}
module.exports = { getUsers , postUsers, createNewInitiativeResponse,createDefaultInitiativeResponse } 
