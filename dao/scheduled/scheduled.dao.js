const scheduled = require('../../model/scheduled');

function createScheduledTask(task) {
    console.log(task,"task IN DAO")

    return new Promise(function (resolve, reject) {
        var now = new Date();
        console.log(now, "POST");
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        console.log(new Date(today).getTime())

        let temp = (task.body.initiative).trim()
        console.log(temp, "temppp")
        if (temp.length !== 0) {
            task.body.initiative = task.body.initiative
        } else {
            task.body.initiative = "default"
        }
        scheduled.findOne({ "initiativeId": task.initiativeId }, function (err, doc) {
            console.log(task.body, "db Object")

            if (err) {
                reject(err)
            } else {
                
                if(doc){

                    console.log(doc.tasks,"docccc")
    
                        console.log(task.body)
                        doc.tasks.push({ text:task.body.tasks.text, projectName: task.body.tasks.projectName, owner: task.body.owner, scheduled_For: task.body.tasks.scheduled_For, scheduled_On: new Date(today).getTime() })
    
                   
                    console.log(doc, "new")
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


// function getScheduledOnTask() {
//     return new Promise(function (resolve, reject) {
//         var now = new Date();
//         console.log(now,"POST");
//         var day = ("0" + now.getDate()).slice(-2);
//         var month = ("0" + (now.getMonth()+ 1)).slice(-2);
//         var today = now.getFullYear() + "-" + (month) + "-" + (day);
//         console.log(new Date(today).getTime())
//         console.log("dao hai ye")

//         scheduled.findOne({ "tasks.scheduled_On": new Date(today).getTime() })
//         .exec((err, data) => {
//             console.log(err,data,"I am data")


//                resolve(data);

//             } )

//         });


// }
function getDefaultScheduledOnTask(task) {
    return new Promise(function (resolve, reject) {
        var now = new Date();
        console.log(now, "POST");
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        console.log(new Date(today).getTime())
        console.log(task, "dao hai ye")

        scheduled.findOne({
            "initiativeId": task
        }, function (err, data) {
            if (err) {
                console.log(err, "hhhh")
                reject(err)
            }

            else {
                console.log(data,"DAODAOAOD")
                if (data === null) {
                    console.log(data,"HAHA")
                    resolve(data)
                } else {

                    data.tasks.map(eachTask => {
                        console.log(eachTask.scheduled_On,new Date(today).getTime() , typeof eachTask.scheduled_On, "MAP scheduledOn")
                        if (eachTask.scheduled_On === new Date(today).getTime()) {

                            resolve(data);
                        }

                    })
                }

            }
        })
    })
}

// function getScheduledForTask(task) {
//     return new Promise(function (resolve, reject) {
//         var now = new Date();
//         console.log(now,"dao get ");
//         var day = ("0" + now.getDate()).slice(-2);
//         var day1= ("0"+ now.getDate()).slice(-2);
//         var month = ("0" + (now.getMonth()+ 1)).slice(-2);
//         var today = now.getFullYear() + "-" + (month) + "-" + (day);
//        console.log(new Date(new Date().getFullYear(), parseInt(month), parseInt(day)))
//         scheduled.findOne({ "tasks":  {$elemMatch :{ "scheduled_For": {$gte: new Date(today).getTime() } }} }).exec((err, data) => {
//             console.log(err,  data);
//             resolve(data);
//         });
//     })
// }
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
                    // console.log(err,  data);
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
            // console.log(data)
            // resolve(data)
        })
    })
}

module.exports = {
    createScheduledTask,

    getDefaultScheduledForTask,
    changeScheduledForTask,
    getDefaultScheduledOnTask
}