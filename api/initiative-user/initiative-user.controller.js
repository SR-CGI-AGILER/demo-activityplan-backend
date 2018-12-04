const initiativeUserDao = require('../../dao/initiative-user/initiative-user.dao')
const userInitiativeDao = require('../../dao/user-initiative/user-initiative.dao');
var uniqid = require('uniqid');


function getUsers(req, res) {
    let temp = {
        id: req.params.initiativeId
    }
    initiativeUserDao.getInitiativeUser(temp).then(doc => {
        res.status('201').send({
            data: doc.members
        })
    }).catch(err => {
        res.send({
            message: 'something went wrong',
            error: err
        })
    })
}

function createNewInitiativeResponse(req, res) {
    let temp = {
        name: req.body.name,
        id: uniqid(),
        members: req.body.members
    }
    console.log(temp)
    initiativeUserDao.createNewInitiative(temp).then(doc => {
        console.log(temp, "FUN!")
        addInitiaviteToUser(req, res, temp.id);
        // res.status('201').send({
        //     data:doc
        //  })
    }).catch(err => {
        res.send({
            message: 'something went wrong',
            error: err
        })
    })
}

function addInitiaviteToUser(req, res, x) {
    // console.log("fun", "asdsad");
    console.log(req.body, "asdasdasdsad")
    let temp = {
        email: req.body.members.email,
        initiativeId: x,
        initiativeName: req.body.name
    }
    userInitiativeDao.addInitiative(temp).then(function (data) {
        res.send({
            message: "user added to the initiative"
        })
    })
}
function postUsers(req, res) {
    let temp = {
        id: req.body.id,
        members: req.body.members
    }
    initiativeUserDao.addUserToInitiative(temp).then(doc => {
        addInitiaviteToUser(req, res, temp.id)
    }).catch(err => {
        res.send({ message: 'soemehfrrj', error: err })
    })
}
function createDefaultInitiativeResponse(req, res) {
    let temp = {
        name: req.body.name,
        id: uniqid(),
        members: req.body.members
    }
    initiativeUserDao.createDefaultInitiative(temp).then(doc => {
        addInitiaviteToUser(req, res, temp.id)
        res.send({
            payload: {
                data: doc
            }
        })
    }).catch(err => {
        res.send({ message: 'soemehfrrj', error: err })
    })
}

function deleteInitiativeResponse(req, res) {
    initiative = {
        id: req.body.initiativeId,
        email: req.body.email
    }
    initiativeUserDao.getInitiativeUser(initiative).then(function (data) {
        let allUserDeletions = [];
        data.members.map(function (e) {
            let temp = {
                name: e.name,
                email: e.email,
                initiativeId: req.body.initiativeId
            }
            allUserDeletions.push(userInitiativeDao.deleteInitiativeFromUser(temp));
        });
        Promise.all(allUserDeletions).then(function (data) {
            initiativeUserDao.deleteInitiative(initiative).then(function (data) {
                res.send({
                    message: "Initiative deleted successfully"
                })
            }).catch(function (err) {
                res.status(500).send({
                    message: "Failed to delete the Initiative"
                })
            })
        }).catch(function (err) {
            res.status(500).send({
                message: "some Error occured"
            })
        })
    }).catch(function (err) {
        res.status(500).send({
            message: "Not able to delete the Initiative from the perticular user"
        })
    })

}
module.exports = {
    getUsers,
    postUsers,
    createNewInitiativeResponse,
    createDefaultInitiativeResponse,
    deleteInitiativeResponse
} 
