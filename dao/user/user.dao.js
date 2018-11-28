const user = require('../../model/user');

function addRecord(name, email, profilePicUrl) {
    // console.log(name, email, profilePicUrl,"hahahAH");
    // console.log(checkEmail(email));
    // checkEmail(email).then(function(data) {
    //     console.log(data)
    // })
    // if(checkEmail(email)){
    //     console.log("YES");
    // }
    // else {
    //     console.log("NO");
    // }
    return new Promise(function (resolve, reject) {
        const userData = new user({
            email:email,
            name:name,
            profilePicUrl:profilePicUrl
        })
        userData.save(function(err,data){
            // console.log(err, "Asdasd")
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

// function checkEmail(email) {
//     return new Promise(function (resolve, reject) {
//         user.find({"email":email},(err,data)=>{
//             if(err){
//                 reject({
//                     msg:"ERROR",
//                     data:err
//                 })
//             }else{
//                 console.log(data,"EMAIL")
//                 if(data.length){
//                     resolve(true);
//                 }
//                 else{
//                     resolve(false);
//                 }
//             }
//         })
//     })
// }


module.exports = {
    addRecord
}