const activity = require('../../model/activity');

function createActivityPlan(plan) {
    return new Promise(function (resolve, reject) {
        const newActivityPlan = new activity({
            createdAt: plan.createdAt,
            initiative: plan.initiative,
            initiativeId: plan.initiativeId,
            tasks: plan.tasks
        })
        
        newActivityPlan.save(function (err, data) {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}


function getActivityPlan(today,initiativeId) {
    // console.log(initiativeId)
    return new Promise(function (resolve, reject) {
        activity.findOne({
            "createdAt": today,
            "initiativeId":initiativeId
        }, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data)
        })
    })
}

module.exports = {
    createActivityPlan,
    getActivityPlan
}