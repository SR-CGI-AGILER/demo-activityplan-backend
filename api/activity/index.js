const router = require('express').Router();
const activityController = require('./activity.controller')

router.post('/tasks', activityController.createActivityPlanResponse);

module.exports  = router