const scheduled = require('../../model/scheduled');

function createScheduledTask(task) {
    

    return new Promise(function (resolve, reject) {
        var now = new Date();
        
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        

        let temp = (task.body.initiative).trim()
        
        if (temp.length !== 0) {
            task.body.initiative = task.body.initiative
        } else {
            task.body.initiative = "default"
        }
        scheduled.findOne({ "initiativeId": task.initiativeId }, function (err, doc) {
            

            if (err) {
                reject(err)
            } else {
                
                if(doc){

                        doc.tasks.push({ text:task.body.tasks.text, projectName: task.body.tasks.projectName, owner: task.body.owner, scheduled_For: task.body.tasks.scheduled_For, scheduled_On: new Date(today).getTime() })
    
                    doc.save(function (err, data) {
                        if (err) {
                            reject(err)
                        }
                        else {
                            resolve(data)
                        }
                    })
                }
                else{
                    const doc= new scheduled();
                    doc.initiative = task.body.initiative;
                    doc.initiativeId = task.initiativeId;
                    doc.tasks = [];
                    
    
                    doc.tasks.push({ text:task.body.tasks.text, projectName: task.body.tasks.projectName, owner: task.body.owner, scheduled_For: task.body.tasks.scheduled_For, scheduled_On: new Date(today).getTime() })
                
                    doc.save(function(err,data){
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(data);
                        }
                    })
                    
                }
            }
        })

    })
}

function getDefaultScheduledOnTask(task) {
    return new Promise(function (resolve, reject) {
        var now = new Date();
        // console.log(now, "POST");
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        // console.log(new Date(today).getTime())
        // console.log(task, "dao hai ye")

        scheduled.findOne({
            "initiativeId": task
        }, function (err, data) {
            if (err) {
                // console.log(err, "hhhh")
                reject(err)
            }

            else {
                // console.log(data,"DAODAOAOD")
                if (data === null) {
                    // console.log(data,"HAHA")
                    resolve(data)
                } else {

                    data.tasks.map(eachTask => {
                        // console.log(eachTask.scheduled_On,new Date(today).getTime() , typeof eachTask.scheduled_On, "MAP scheduledOn")
                        if (eachTask.scheduled_On === new Date(today).getTime()) {

                            resolve(data);
                        }

                    })
                }

            }
        })
    })
}

function getDefaultScheduledForTask(task) {
    return new Promise(function (resolve, reject) {
        var now = new Date();
        console.log(now, "dao get ");
        var day = ("0" + now.getDate()).slice(-2);
        var day1 = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        console.log(new Date(new Date().getFullYear(), parseInt(month), parseInt(day)))
        scheduled.findOne({ "initiativeId": task }).exec((err, data) => {
            if (err) {
                resolve(err)
            } else {
                if (data === null) {
                    resolve(data)
                } else {

                    resolve(data);
                }
            }

        });
    })
}

function changeScheduledForTask(task) {

    return new Promise(function (resolve, reject) {
        scheduled.findOne({
            "initiativeId": task.initiativeId
        }, function (err, data) {
            if (err)
                reject(err)
            else {
                data.tasks.map(function (eachDbTask) {
                    task.arr.map(function(eachTask) {
                        if (eachDbTask._id.toString() === eachTask.taskId ) {
                            eachDbTask.scheduled_For = eachTask.scheduled_For
                         
                        }
                    })
                })
            }
            data.save().then(function () {
                resolve(data)
            })

        })
    })
}

module.exports = {
    createScheduledTask,

    getDefaultScheduledForTask,
    changeScheduledForTask,
    getDefaultScheduledOnTask
}