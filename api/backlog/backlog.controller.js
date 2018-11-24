const backlogDao = require('../../dao/backlog/backlog.dao');

function getBacklogTasksResponse(req,res){
    let queryParams = {
        limit: parseInt(req.query.limit) || 10,
        page: parseInt(req.query.page) || 0,
    }
    backlogDao.getBacklogTasks(queryParams).then(doc => {
        console.log(doc)
        res.send({
            payload:{
                data:doc
            }
        })
    })
}

function addBacklogTaskResponse(req,res){
    let temp = {
        initiative : req.body.initiative,
        tasks: req.body.tasks
    }
    backlogDao.addBacklogTask(temp).then(data => {
        res.status('200').send({
            data : data
        })
    }).catch(err => {
        res.send(err)
    })
}
    
//     // cal the dao, and handle the err on the catch block
//     backlogDao
//     .then(data)
//     .catch(err)
// }

function addBacklogTaskToActivityPlanResponse(req,res) {
    let temp = {
        taskid : req.params.taskId,
        initiativeid: req.params.initiativeId
    };
    backlogDao.deleteTaskFromBacklog(temp).then((data) => {
        res.status('200').send({
            data:data
        })
    }).catch(err => {
        res.send(err)
    })
}

module.exports = { getBacklogTasksResponse, addBacklogTaskResponse, addBacklogTaskToActivityPlanResponse}