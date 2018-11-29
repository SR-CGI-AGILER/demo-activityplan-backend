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

function updateTeamCopy(data) {
    return new Promise(function (resolve, reject) {
        teamCopy.findOne({
            "createdAt":new Date(data.teamCopyDate).getTime()
        },function(err, doc){
            if(err)
            {
                console.log(err)
                reject(err)
            }
            else{
                doc.tasks.map(function(e){
                    let a = e._id.toString();
                    console.log(a,data.taskId,"each task")
                    if(a === data.taskId){
                        e.status = "Completed";
                    }
                })
                doc.save().then(function () {
                    resolve(doc)
                })
                // resolve(doc);
            }
        });
    })
}

function updateTeamCopyNew(data) {
    return new Promise(function (resolve, reject){
        teamCopy.findOne({
           'createdAt': new Date(data.teamCopyDate).toISOString()
                }).exec(function(err,doc) {
            // console.log(data.map(e => e.tasks), err)
            if(err)
            {
                reject(err)
            }
            else{
                   doc.tasks.map(function (eachDbTask) {
                       data.arr.map(function(eachTask) {
                        //    console.log(eachDbTask._id, eachTask.taskId)
                           if (eachDbTask._id.toString() === eachTask.taskId ) {
                               eachDbTask.status = eachTask.action
                               console.log('Match Found')
                           }
                       })
                   })
                            doc.save().then(function(data) {
                               resolve({"message": "the data is saved"})
                            })
                            
            }
        })
        // }, function(err, doc){
        //     if(err) {
        //         // console.log(err,"error due to Atreya's fault");
        //         reject(err)
        //     }
        //     else{
        //         console.log(doc,"atreya ka else");
        //         // doc.tasks.map(function(task){
        //         //     let id = task._id.toString();
        //         //     // console.log(data.arr,"arr");
        //         //     // data.arr.map(function(e){
        //         //         // console.log(e.taskId,"taskId");
        //         //         if(id === .taskId)
        //         //         {
        //         //             let ignoreCase= e.action.toUpperCase();
        //         //             // console.log(ignoreCase,"ignoreCase");
        //         //             if(ignoreCase === "NEW")
        //         //             task.status = "New";
        //         //             else if(ignoreCase === "COMPLETED")
        //         //             task.status = "Completed";
        //         //             else if(ignoreCase === "PENDING")
        //         //             task.status = "Pending";
        //         //         }
        //         //     // })
        //         //     // if(id === data.taskId)
        //         //     // {
        //         //     //     let ignoreCase= data.action.toUpperCase();
        //         //     //     console.log(ignoreCase,"ignoreCase");
        //         //     //     if(ignoreCase === "NEW")
        //         //     //     task.status = "New";
        //         //     //     else if(ignoreCase === "COMPLETED")
        //         //     //     task.status = "Completed";
        //         //     //     else if(ignoreCase === "PENDING")
        //         //     //     task.status = "Pending";
                    
        //         //     // }
        //         // })
        //         // doc.save().then(function(err) {
        //         //     if(err){
        //         //         reject(err)
        //         //     }
        //         //     else{
        //         //         resolve(doc);
        //         //     }
        //         // }).catch(function (err) {
        //         //     resolve(err)
        //         // })

        //     }
        // })
    });
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

module.exports = {
    createTeamCopy,
    getTeamCopy,
    updateTeamCopy,
    updateTeamCopyNew
}