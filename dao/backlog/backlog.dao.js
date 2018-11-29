const backlog = require('../../model/backlog')
const uniqid = require('uniqid');


function getBacklogTasks(query) {
    console.log(query)
    return new Promise(function(resolve,reject){
        backlog.findOne({"initiativeId":query.initiativeid})
                .limit(query.limit)
                .skip(query.page * query.limit)
                .exec(function(err,data) {
                    console.log(query.initiativeid,"Initiative ID")
            if(err)
            reject(err)
            else
            resolve(data)
        })
    })
}


function addBacklogTask(task){
    return new Promise(function(resolve,reject){
        backlog.findOne({"initiativeId":task.initiativeid},function(err,doc){
            console.log(task.initiative)
            if(err){
            reject(err)
            }
            else{
                if(doc){
                    task.tasks.map(function(eachTask){
                        doc.tasks.push({text:eachTask.text, projectName:eachTask.projectName,due_date:eachTask.due_date,owner:eachTask.due_date,status:eachTask.due_date})
                    })
                    doc.save(function(err,data) {
                        if(err){
                        reject(err)}
                        else {
                            resolve(data)
                        }
                    })
                }
                else{
                    const doc = new backlog()
                    doc.initiative = task.initiativeName
                    doc.initiativeId = task.initiativeid
                    doc.tasks = []
                    task.tasks.map(eachitem => {
                        doc.tasks.push(eachitem)
                    })
                    doc.save(function (err,data){
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

function deleteTaskFromBacklog(task){
    return new Promise(function(resolve,reject){
        backlog.findOne({
            "_id":task.initiativeid,
            "tasks._id": task.taskid
        }, function(err,doc){
            if(err)
            reject(err)
            else{
                doc.tasks.pull(doc.tasks[0]._id)
                doc.save();
                resolve(doc);
            }
        })
    })
}

//         task.map(eachTask => {
//             const temp = new backlog({
//                 "text" : eachTask.text,
//                 "projectName" : eachTask.projectName,
//                 "backlog" : true,
//                 "status" : "Not Picked"
//             })
//             temp.save(function(err,data){
//                 if(err)
//                 throw err
//                 else
//                 resolve(data)
//             })
//         })
//     })
// }

module.exports = {getBacklogTasks,addBacklogTask,deleteTaskFromBacklog}