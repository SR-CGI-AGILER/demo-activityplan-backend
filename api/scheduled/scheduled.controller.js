const scheduledDao = require('../../dao/scheduled/scheduled.dao')

function createScheduledTaskResponse(req, res) {
    let data = {
        body: req.body,
        initiativeId: req.params.initiativeId
    };
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
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    scheduledDao.getDefaultScheduledOnTask(req.params.initiativeId).then(doc => {
        if (doc !== null) {
            let temp = doc.tasks.map(task => {
                
                let a = new Date(today).getTime()
                if (task.scheduled_On === a) {
                    arr.push(task)
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
function getDefaultScheduledForTaskResponse(req, res) {
    let arr = []
    var now = new Date();
    
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    scheduledDao.getDefaultScheduledForTask(req.params.initiativeId).then(doc => {
        
        if (doc !== null) {
        let temp = doc.tasks.map(task => {
            
            let a = new Date(today).getTime()
            if (task.scheduled_For >= a) {
                arr.push(task)
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