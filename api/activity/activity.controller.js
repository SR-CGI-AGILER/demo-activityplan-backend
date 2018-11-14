const activityDao = require('../../dao/activity/activity.dao')

function createActivityPlanResponse(req,res) {
    console.log(typeof req.body)

    activityDao.createActivityPlan(req).then(doc =>{
        res.send({
            payload:{
                data:doc
            }
        })
    })
}  

module.exports = {createActivityPlanResponse}