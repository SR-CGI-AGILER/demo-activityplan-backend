const activity = require('../../model/activity');

function createActivityPlan(plan) {
    return new Promise(function(resolve,reject){
        plan.body.map(eachitem => {
            // console.log(eachitem.text,"nkkn@@@2")
        const temp = new activity({
            "text": eachitem.text,
            "projectName" : eachitem.projectName,
            "owner" : eachitem.owner
        })
        temp.save(function(err,data){
            if(err)
            console.log(err)
            resolve(data)
        })
    })
})
}

module.exports = {createActivityPlan}