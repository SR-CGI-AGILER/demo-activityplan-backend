const userinitiativemapping = require('../../model/user-initiative-mapping');

function getUserInitiative(temp){
    return new Promise(function (resolve, reject) {
       
        userinitiativemapping.find({"members.email":temp.email }).exec((err, data) => {
            if(err)
            reject(err)
            else
               resolve(data);
            })
        });
}

function addInitiative(temp) {
    return new Promise(function(resolve,reject) {
        userinitiativemapping.findOne({"email": temp.email}).exec((err,data) =>{
            if(err){
            reject(err)
            }
            else{
                console.log(data,"in else")
                if(data){
                    data.initiative.push({initiativeId: temp.id, initiativeName: temp.initiativeName})
                    doc.save(function(err,data){
                        if(err)
                        reject(err)
                        else
                        resolve(data)
                    })
                }
                else{
                    const data = new userinitiativemapping()
                    data.email = temp.email
                    data.initiative.push({initiativeId: temp.initiativeId, initiativeName: temp.init})
                    
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