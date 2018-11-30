const teamCopy = require('../../model/teamCopy');

function createTeamCopy(plan) {
    return new Promise(function (resolve, reject) {
        const newTeamCopy = new teamCopy({
            createdAt: plan.createdAt,
            initiative: plan.initiative,
            initiativeId: plan.initiativeId,
            tasks: plan.tasks
        })
        newTeamCopy.save(function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function getTeamCopy(date, initiativeId){
    return new Promise(function (resolve, reject) {
        teamCopy.findOne({
            "createdAt": date,
            "initiativeId":initiativeId
        }, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data)
        })
    })
}

function addToTeamCopy(data) {
    return new Promise(function (resolve, reject) {
      
        teamCopy.findOne({
            "createdAt": new Date(data.createdAt).toISOString(),
            'initiativeId': data.initiativeId
        }, function(err, doc) {
              if(err){
                  reject(err)
              }
              else{
                  
                //   if(doc.initiatives === data.initiatives){
                  
                      doc.tasks.push(data.task);
                //   }
    
                  doc.save().then(function(data){
                      resolve(data);
                  })
              }
        })
    })
}


function updateTeamCopy(data) {
    console.log(data,"data in dao");
    return new Promise(function (resolve, reject){
        teamCopy.findOne({
           'createdAt': new Date(data.teamCopyDate).toISOString(),
           'initiativeId': data.initiativeId
                }).exec(function(err,doc) {
            if(err)
            {
                reject(err)
            }
            else{
                console.log(doc,"doc");
                   doc.tasks.map(function (eachDbTask) {
                       data.arr.map(function(eachTask) {
                           if (eachDbTask._id.toString() === eachTask.taskId ) {
                               eachDbTask.status = eachTask.action
                            
                           }
                       })
                   })
                            doc.save().then(function(data) {
                               resolve({"message": "the data is saved"})
                            })            
                }
        })
    });
 }

module.exports = {
    createTeamCopy,
    getTeamCopy,
    updateTeamCopy,
    addToTeamCopy
}