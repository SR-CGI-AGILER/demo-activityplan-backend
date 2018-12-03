const scheduledDao = require('../../dao/scheduled/scheduled.dao')

function createScheduledTaskResponse(req, res) {
    console.log(req.body,"REQUEST BODY");
    let data = {
        body: req.body,
        initiativeId: req.params.initiativeId
    };
    console.log(data,"in controller");
    scheduledDao.createScheduledTask(data).then(doc => {
        res.status('201').send({
            data: doc
        })
    }).catch(err => {
        res.send({
            message: 'something went wrong',
            error: err
        })
    })
}
function getDefaultScheduledOnTaskResponse(req, res) {
    let arr = []
    var now = new Date();
    console.log(now, "POST");
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    scheduledDao.getDefaultScheduledOnTask(req.params.initiativeId).then(doc => {
        console.log(doc, "in doc")
        if (doc !== null) {
            let temp = doc.tasks.map(task => {
                //     console.log("task",task.scheduled_On,today)
                let a = new Date(today).getTime()
                console.log(a, "hhh");
                if (task.scheduled_On === a) {
                    console.log("tahhhsk", task)

                    arr.push(task)
                    console.log(arr, "arrrr")
                }
            })
        } else {
            arr = []
        }
        res.send({
            payload: {
                data: arr
            }
        })
    }).catch(err => {
        res.send({
            message: 'something went wrong for task',
            error: err
        })
    })
}
// function getScheduledForTaskResponse(req,res){
//     let arr =[]
//     var now = new Date();
//     console.log(now,"POST");
//     var day = ("0" + now.getDate()).slice(-2);
//     var month = ("0" + (now.getMonth()+ 1)).slice(-2);
//     var today = now.getFullYear() + "-" + (month) + "-" + (day);
//     scheduledDao.getScheduledForTask().then(doc => {
//         console.log(doc.tasks,"in doc")
//         let temp = doc.tasks.map(task =>{
//         //     console.log("task",task.scheduled_On,today)
//             let a = new Date(today).getTime()
//             console.log(a,"hhh");
//             if(task.scheduled_For >= a){
//                 console.log("tahhhsk",task)

//                 arr.push(task)
//                 console.log(arr,"arrrr")
//             }
//         })
//                 res.send({
//             payload : {
//                 data:arr
//             }
//         })
//     }).catch(err => {
//         res.send({message:'something went wrong  on task', 
//        error: err})
//     })
// }
function getDefaultScheduledForTaskResponse(req, res) {
    let arr = []
    var now = new Date();
    console.log(now, "POST");
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    scheduledDao.getDefaultScheduledForTask(req.params.initiativeId).then(doc => {
        // console.log(doc.tasks,"in doc")
        if (doc !== null) {
        let temp = doc.tasks.map(task => {
            //     console.log("task",task.scheduled_On,today)
            let a = new Date(today).getTime()
            console.log(a, "hhh");
            if (task.scheduled_For >= a) {
                console.log("tahhhsk", task)

                arr.push(task)
                console.log(arr, "arrrr")
            }
        })
    }else{
        arr = []
    }
        res.send({
            payload: {
                data: arr
            }
        })
    }).catch(err => {
        res.send({
            message: 'something went wrong  on task',
            error: err
        })
    })
}

function changeScheduledForTaskResponse(req, res) {
    let data = {
        initiativeId: req.params.initiativeId,
        arr: req.body.arr
    };
    console.log(data, "this is controller for due date")
    scheduledDao.changeScheduledForTask(data).then(data => {
        res.status('200').send({
            data: data
        })
    })
}


module.exports = {
    createScheduledTaskResponse,
    getDefaultScheduledForTaskResponse,
    changeScheduledForTaskResponse,
    getDefaultScheduledOnTaskResponse,
}