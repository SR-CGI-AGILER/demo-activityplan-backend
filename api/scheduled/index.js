const router = require('express').Router();
const scheduledController = require('./scheduled.controller')

router.post('/scheduled/task', scheduledController.createScheduledTaskResponse);  
// router.patch('/scheduled/task/:taskId', scheduledController.cancelScheduledTaskResponse); 
router.patch('/scheduled/task/:initiativeId/:taskId', scheduledController.changeScheduledForTaskResponse); 
router.get('/scheduledx/task/:initiativeId', scheduledController.getDefaultScheduledForTaskResponse); //get activity plan
// router.get('/scheduled/task', scheduledController.getScheduledOnTaskResponse); //get activity plan
router.get('/scheduledy/task/:initiativeId', scheduledController.getDefaultScheduledOnTaskResponse); //get activity plan

module.exports  = router