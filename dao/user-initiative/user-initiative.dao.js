const userinitiativemapping = require('../../model/user-initiative-mapping');
var uniqid = require('uniqid');


function getUserInitiative(temp){
    return new Promise(function (resolve, reject) {
       
        userinitiativemapping.findOne({"email":temp.email }).exec((err, data) => {
            if(err)
            reject(err)
            else
               resolve(data);
            })
        });
}

function addInitiative(temp) {
    console.log("here")
    return new Promise(function(resolve,reject) {
        userinitiativemapping.findOne({"email": temp.email}).exec((err,data) =>{
            if(err){
            reject(err)
            console.log("if")
            }
            else{
                console.log("else")
                console.log(data,"in else")
                if(data){
                    data.initiative.push({initiativeId: temp.initiativeId, initiativeName: temp.initiativeName})
                    data.save(function(err,data){
                        if(err)
                            reject(err)
                        else
                            resolve(data)
                    })
                }
                else{
                    const data = new userinitiativemapping()
                    data.email = temp.email
                    data.initiative.push({initiativeId:temp.initiativeId , initiativeName: temp.initiativeName})
                    
                    data.save(function (err,data){
                        if(err)
                            reject(err)
                        else{
                            resolve(data)
                        }
                    })
                }
            }
        })
    })
}    

module.exports = { getUserInitiative, addInitiative }