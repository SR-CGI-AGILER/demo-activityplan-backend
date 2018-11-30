const teamCopy = require('../../model/teamCopy');

function createTeamCopy(plan) {
    return new Promise(function (resolve, reject) {
        const newTeamCopy = new teamCopy({
            createdAt: plan.createdAt,
            initiatives: plan.initiatives,
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

function getTeamCopy(date, initiatives){
    return new Promise(function (resolve, reject) {
        teamCopy.findOne({
            "createdAt": date,
            "initiatives":initiatives
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
            "createdAt": new Date(data.createdAt).toISOString()
        }, function(err, doc) {
              if(err){
                  reject(err)
              }
              else{
                  
                  if(doc.initiatives === data.initiatives){
                  
                      doc.tasks.push(data.task);
                  }
    
                  doc.save().then(function(data){
                      resolve(data);
                  })
              }
        })
    })
}


function updateTeamCopy(data) {
    return new Promise(function (resolve, reject){
        teamCopy.findOne({
           'createdAt': new Date(data.teamCopyDate).toISOString()
                }).exec(function(err,doc) {
            if(err)
            {
                reject(err)
            }
            else{
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