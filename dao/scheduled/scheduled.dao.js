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

        scheduled.findOne({ "initiative": task.initiative }, function (err, doc) {
            console.log(doc, "db Object")

            if (err) {
                reject(err)
            } else {
                // console.log(doc.tasks)
                if (doc) {
                    task.tasks.map(function (eachitem) {
                        
                        doc.tasks.push({ text: eachitem.text, projectName: eachitem.projectName, scheduled_For: eachitem.scheduled_For,scheduled_On: new Date(today).getTime()})
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
                    doc.tasks = []
                    task.tasks.map(eachitem => {
                        doc.tasks.push({text: eachitem.text, projectName: eachitem.projectName, scheduled_For: eachitem.scheduled_For,scheduled_On: new Date(today).getTime()})
                    })
                    console.log(doc,"FGV@@@@@@@@@@@")
                    doc.save(function (err, data) {
                        if (err)
                            reject(err)
                        else {
                            resolve(data)
                        }
    
                    })
        }
    }
  
                
            })     
            
    })
}


function getScheduledOnTask() {
    return new Promise(function (resolve, reject) {
        var now = new Date();
        console.log(now,"POST");
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth()+ 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        console.log(new Date(today).getTime())
        console.log("dao hai ye")

        scheduled.findOne({ "tasks.scheduled_On": new Date(today).getTime() }).exec((err, data) => {
            console.log(err,data,"I am data")
            
               
               resolve(data);

            } )

        });
     
    
}
function getScheduledForTask(task) {
    return new Promise(function (resolve, reject) {
        var now = new Date();
        console.log(now,"dao get ");
        var day = ("0" + now.getDate()).slice(-2);
        var day1= ("0"+ now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth()+ 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
       console.log(new Date(new Date().getFullYear(), parseInt(month), parseInt(day)))
        scheduled.findOne({ "tasks":  {$elemMatch :{ "scheduled_For": {$gte: new Date(today).getTime() } }} }).exec((err, data) => {
            console.log(err,  data);
            resolve(data);
        });
    })
}

module.exports = {
    createScheduledTask,
    getScheduledOnTask,
    getScheduledForTask
}