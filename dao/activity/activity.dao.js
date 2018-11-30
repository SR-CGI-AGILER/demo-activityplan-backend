const activity = require('../../model/activity');

function createActivityPlan(plan) {
    return new Promise(function (resolve, reject) {
        const newActivityPlan = new activity({
            createdAt: plan.createdAt,
            initiatives: plan.initiatives,
            tasks: plan.tasks
        })
        
        newActivityPlan.save(function (err, data) {
            if (err) {
                console.log("ERROR");
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}


function getActivityPlan(today,initiatives) {
    console.log(initiatives)
    return new Promise(function (resolve, reject) {
        activity.findOne({
            "createdAt": today,
            "initiatives":initiatives
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