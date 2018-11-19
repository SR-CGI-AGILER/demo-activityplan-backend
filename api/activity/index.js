const router = require('express').Router();
const activityController = require('./activity.controller')

router.post('/activityplan', activityController.createActivityPlanResponse);  //publish activity plan
router.get('/activityplan', activityController.getActivityPlanResponse); //get activity plan

module.exports  = router