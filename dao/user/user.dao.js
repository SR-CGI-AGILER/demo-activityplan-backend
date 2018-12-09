const user = require('../../model/user');

function addRecord(name, email, profilePicUrl) {
    
    return new Promise(function (resolve, reject) {
        const userData = new user({
            email:email,
            name:name,
            profilePicUrl:profilePicUrl
        })
        userData.save(function(err,data){
            
            if(err){
                reject({
                    msg:"ERROR",
                    data: {email:email,
                        name:name,
                        profilePicUrl:profilePicUrl}
                })
            }else{
                resolve({
                    msg:"OK",
                    data:data
                })
            }
        })
    })
}

function checkEmail(email) {
    return new Promise(function (resolve, reject) {
        user.findOne({"email":email},(err,data)=>{
            if(err){
                reject({
                    msg:"ERROR",
                    data:err
                })
            }else{
                if(data === null){
                    resolve({
                        status: false,
                        data: null
                    });
                }
                else{
                    resolve({
                        status: true,
                        data: data
                    });
                }
            }
        })
    })
}


module.exports = {
    addRecord,
    checkEmail
}