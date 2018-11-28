const scheduled = require('../../model/scheduled');

function createScheduledTask(task) {
    // console.log(task)

    return new Promise(function (resolve, reject) {
        var now = new Date();
            console.log(now,"POST");
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth()+ 1)).slice(-2);
            var today = now.getFullYear() + "-" + (month) + "-" + (day);
            console.log(new Date(today).getTime())

            let temp = (task.initiative).trim()
            console.log(temp,"temppp")
                if (temp.length !== 0) {
                    task.initiative = task.initiative
                }else{
                    task.initiative = "default"
                }
        scheduled.findOne({ "initiativeId":task.initiativeId }, function (err, doc) {
            console.log(doc, "db Object")

            if (err) {
                reject(err)
            } else {
                // console.log(doc.tasks)
                if (doc) {
                    task.tasks.map(function (eachitem) {
                        
                        doc.tasks.push({ text: eachitem.text, projectName: eachitem.projectName,owner:eachitem.owner, scheduled_For: eachitem.scheduled_For,scheduled_On: new Date(today).getTime()})
                        
                    })
                    console.log(doc, "new")
                    doc.save(function (err, data) {
                        if (err) {
                            reject(err)
                        }
                        else {
                            resolve(data)
                        }
    
                    })
                } else {
                    const doc = new scheduled()
              
                        doc.initiative = task.initiative
                        doc.initiativeId = task.initiativeId
                        console.log(doc.initiativeId,"hhhhh")
                   
                    doc.tasks = []
                    task.tasks.map(eachitem => {
                        doc.tasks.push({text: eachitem.text, projectName: eachitem.projectName,owner:eachitem.owner, scheduled_For: eachitem.scheduled_For,scheduled_On: new Date(today).getTime()})
                    })
                    console.log(doc,"FGV@@@@@@@@@@@")
                    doc.save(function (err, data) {
                        if (err){
console.log(err,"err")
                            reject(err)
                        }
                        else {
                            resolve(data)
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
        console.log(now,"POST");
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth()+ 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        console.log(new Date(today).getTime())
        console.log("dao hai ye")

        scheduled.findOne({ "initiativeId": task 
    }, function (err, data) {
        if(err)
        reject(err)
        else {
            data.tasks.map(eachTask => {
                if(eachTask.scheduled_On == new Date(today).getTime())
               
                resolve(data);
            })
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
        console.log(now,"dao get ");
        var day = ("0" + now.getDate()).slice(-2);
        var day1= ("0"+ now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth()+ 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
       console.log(new Date(new Date().getFullYear(), parseInt(month), parseInt(day)))
        scheduled.findOne({"initiativeId":task }).exec((err, data) => {
                             console.log(err,  data);
                             resolve(data);
        });
    })
}

function changeScheduledForTask(task){

        return new Promise(function (resolve, reject) {
            scheduled.findOne({
                "initiativeId":task.initiativeId
            }, function (err, data) {
                if(err)
                reject(err)
                else {
                    data.tasks.map(eachTask => {
                        if(eachTask._id == task.taskId)
                        eachTask.scheduled_For = task.scheduled_For
                    })
                }
                data.save().then(function(){
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