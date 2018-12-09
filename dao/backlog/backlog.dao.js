const backlog = require('../../model/backlog')
const uniqid = require('uniqid');


function getBacklogTasks(query) {
    return new Promise(function(resolve,reject){
        backlog.findOne({"initiativeId":query.initiativeid})
                .limit(query.limit)
                .skip(query.page * query.limit)
                .exec(function(err,data) {

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
            if(err){
                reject(err)
            }
            else{
                doc.tasks.pull(doc.tasks[0]._id)
                doc.save();
                resolve(doc);
            }
        })
    })
}

function assignOwner(temp) { 
    return new Promise(function(resolve,reject) {
        backlog.findOne({
            'initiativeId': temp.initiativeId
    }, function(err,data) {
        if (err) {
            reject(err) 
        }else {            
            data.tasks.map(function(e) {
                
                if ((e._id).toString() === temp.taskid) { 
                    e.owner = temp.name
                    return e
                }else {
                    
                    return e
                }
            })
        } 
            data.save(function(err,data){
                if(err){
                    reject(err)
                }
                else{
                    resolve(data)
                }
            })
        })
    })
}


module.exports = {getBacklogTasks,addBacklogTask,assignOwner,deleteTaskFromBacklog}