const backlogDao = require('../../dao/backlog/backlog.dao');

function getBacklogTasksResponse(req,res){
    let queryParams = {
        limit: parseInt(req.query.limit) || 10,
        page: parseInt(req.query.page) || 0,
        initiativeid: req.params.initiativeId
    }
    backlogDao.getBacklogTasks(queryParams).then(doc => {
        res.send({
            payload:{
                data:doc
            }
        })
    })
}

function addBacklogTaskResponse(req,res){
    let temp = {
        initiativeid : req.params.initiativeId,
        initiativeName: req.body.initiativeName,
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

function assignOwnerResponse(req,res) {
    let temp = {
        name : req.body.name,
        email: req.body.email,
        profilePicUrl:  req.body.profilePicUrl,
        initiativeId: req.params.initiativeId,
        taskid: req.body.taskId
}
    backlogDao.assignOwner(temp).then((data) => {
        res.status('200').send({
            data:data
        })
    }).catch(err => {
        res.send(err)
    })
}

module.exports = { 
    getBacklogTasksResponse, 
    assignOwnerResponse, 
    addBacklogTaskResponse, 
    addBacklogTaskToActivityPlanResponse
}