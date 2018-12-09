const activityDao = require('../../dao/activity/activity.dao');
const teamCopyDao = require('../../dao/teamCopy/teamCopy.dao');

function createActivityPlanResponse(req, res) {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    const plan = {
        createdAt: today,
        initiative: req.body.initiative,
        initiativeId: req.body.initiativeId,
        tasks: req.body.tasks        
    }

    activityDao.createActivityPlan(plan).then(doc => {
        teamCopyDao.createTeamCopy(plan).then(doc => {
            res.send({
                payload: {
                    data: doc
                }
            })
        })
        
    }).catch(function(err){
        res.send({
            message: err
        });
    });

}

function getActivityPlanResponse(req, res) {
    const date = req.query.date;
    const initiativeId = req.query.initiativeId;

    if(!date){
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth()+ 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        activityDao.getActivityPlan(today, initiativeId).then(doc => {
            if(doc){
                res.send({
                    payload: {
                            data: doc
                        }
                    });
            }
            else{
                res.send({
                    payload: {
                            data: "NO DATA FOUND"
                        }
                    });
            }
        });
    }
    else{
        if(!initiatives){
            activityDao.getActivityPlan(date, "default").then(doc=>{
                if(doc){
                    res.send({
                        payload: {
                                data: doc
                            }
                        });
                }
                else{
                    res.send({
                        payload: {
                                data: "NO DATA FOUND"
                            }
                        });
                }
            })    
        }
        else{
            activityDao.getActivityPlan(date, initiatives).then(doc => {
                if(doc){
                    res.send({
                        payload: {
                                data: doc
                            }
                        });
                }
                else{
                    res.send({
                        payload: {
                                data: "NO DATA FOUND"
                            }
                        });
                }
            })
        }
    }
}

module.exports = {
    createActivityPlanResponse,
    getActivityPlanResponse
}