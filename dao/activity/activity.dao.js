const activity = require('../../model/activity');

function createActivityPlan(plan) {
    return new Promise(function(resolve,reject){
        plan.body.map(eachitem => {
            // console.log(eachitem.text,"nkkn@@@2")
        const temp = new activity({
            "date": eachitem.date,
            "tasks" : eachitem.tasks
        })
        console.log(temp,"dagf@@@@@@")
        temp.save(function(err,data){
            if(err)
            throw err
            resolve(data)
        })
    })
})
}

function getActivityPlan() {
    return new Promise(function (resolve, reject){
    activity.find({}, function(err,data) {
        console.log(err)
        resolve(data)
    })
    })
}

module.exports = {createActivityPlan,getActivityPlan}