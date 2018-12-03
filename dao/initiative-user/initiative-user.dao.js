const initiativeusermapping = require('../../model/initiative-user-mapping');


function getInitiativeUser(temp){                   //get all users of a particular initiative
    console.log(temp, "what is happening")
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
                doc.members.push({ email: temp.members.email,  owner: false})
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

function createNewInitiative(temp) {   //creat initiative and assign that user as member
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
                // console.log("ERROR");
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
                // console.log("ERROR");
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

function deleteInitiative(initiative){
    return new Promise(function(resolve, reject) {
        console.log(initiative, "while deleting the initiaitve")
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