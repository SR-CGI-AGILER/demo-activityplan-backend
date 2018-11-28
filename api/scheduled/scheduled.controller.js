const scheduledDao = require('../../dao/scheduled/scheduled.dao')

function createScheduledTaskResponse(req,res) {
    
    scheduledDao.createScheduledTask(req.body).then(doc =>{
        res.status('201').send({
           data:doc
        })
    }).catch(err => {
         res.send({message:'something went wrong', 
        error: err})
    })
}
function getScheduledOnTaskResponse(req,res){
    let arr =[]
    var now = new Date();
    console.log(now,"POST");
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth()+ 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    scheduledDao.getScheduledOnTask().then(doc => {
console.log(doc.tasks,"in doc")
let temp = doc.tasks.map(task =>{
//     console.log("task",task.scheduled_On,today)
    let a = new Date(today).getTime()
    console.log(a,"hhh");
    if(task.scheduled_On === a){
        console.log("tahhhsk",task)

        arr.push(task)
        console.log(arr,"arrrr")
    }
})



        res.send({
            payload : {
                data:arr
            }
        })
    }).catch(err => {
        res.send({message:'something went wrong for task', 
       error: err})
    })
}
function getScheduledForTaskResponse(req,res){
    let arr =[]
    var now = new Date();
    console.log(now,"POST");
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth()+ 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    scheduledDao.getScheduledForTask().then(doc => {
        console.log(doc.tasks,"in doc")
        let temp = doc.tasks.map(task =>{
        //     console.log("task",task.scheduled_On,today)
            let a = new Date(today).getTime()
            console.log(a,"hhh");
            if(task.scheduled_For >= a){
                console.log("tahhhsk",task)
        
                arr.push(task)
                console.log(arr,"arrrr")
            }
        })
                res.send({
            payload : {
                data:arr
            }
        })
    }).catch(err => {
        res.send({message:'something went wrong  on task', 
       error: err})
    })
}


module.exports = {
    createScheduledTaskResponse,
    getScheduledOnTaskResponse,
    getScheduledForTaskResponse
    }