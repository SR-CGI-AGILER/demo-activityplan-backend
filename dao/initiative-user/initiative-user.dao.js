const initiativeusermapping = require('../../model/initiative-user-mapping');


function getInitiativeUser(temp){                   //get all users of a particular initiative
    return new Promise(function (resolve, reject) {
       
        initiativeusermapping.findOne({ "initiative.id":temp.id}).exec((err, data) => {
            if(err)
                reject(err)
            else
                resolve(data);
            })
        });
}

function addUserToInitiative(temp) {                
    return new Promise(function (resolve,reject){
        initiativeusermapping.findOne({"initiative.id":temp.id},function(err,doc){
            if(err)
                reject(err)
            else{ 
                doc.members.push({ name:temp.members.data.name, email: temp.members.data.email, owner: false})
                doc.save(function(err,data){
                    if(err)
                    reject(err)
                    else
                    resolve(data)
                })
            }
        })
    })
}

function createNewInitiative(temp) {   
    return new Promise(function (resolve,reject) {
        const newInitiativeUser = new initiativeusermapping({
            initiative: {
                id : temp.id,
                name : temp.name
            },
            members:[
                {
                    name : temp.members.name,
                    email : temp.members.email,
                    profilePicUrl : temp.members.profilePicUrl,
                    owner: true
                }
            ]
        })
        newInitiativeUser.save(function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}
function createDefaultInitiative(temp){
    return new Promise(function (resolve,reject) {
        const newInitiativeUser = new initiativeusermapping({
            initiative: {
                id : temp.id,
                name : temp.name
            },
            members:[
                {
                    name : temp.members.name,
                    email : temp.members.email,
                    profilePicUrl : temp.members.profilePicUrl,
                    owner: true
                }
            ]
        })
        newInitiativeUser.save(function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

function deleteInitiative(initiative){
    return new Promise(function(resolve, reject) {
        resolve("ok")
        initiativeusermapping.deleteOne({ "initiative.id" : initiative.id }, function(err) {
            if (err) {
                reject(err)
            }else{
                resolve(initiative)
            }
        })
    })
}
module.exports = { 
    getInitiativeUser, 
    addUserToInitiative, 
    createNewInitiative,
    createDefaultInitiative,
    deleteInitiative
}