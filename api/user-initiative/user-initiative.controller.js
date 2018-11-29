const userInitiativeDao = require('../../dao/user-initiative/user-initiative.dao')

function getInitiativesResponse(req,res){
    let temp = {
        email : req.params.userId
    }
    userInitiativeDao.getUserInitiative(temp).then(doc =>{
        res.status('201').send({
           data:doc
        })
    }).catch(err => {
         res.send({message:'something went wrong', 
        error: err})
    })
}

function addInitiativeResponse(req,res) {
    let temp = {
        id: req.body.initiativeId,
        email : req.body.email,
        initiativeName : req.body.initiativeName
    }
    userInitiativeDao.addInitiative(temp).then(doc => {
        res.status('201').send({
            data:doc
         })
     }).catch(err => {
          res.send({message:'something went wrong', 
         error: err})
    })
}

module.exports = {
    getInitiativesResponse, addInitiativeResponse
}