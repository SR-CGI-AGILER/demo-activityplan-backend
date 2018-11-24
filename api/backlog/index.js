const router = require('express').Router();
const backlogController = require('./backlog.controller')

router.get('/backlog/:limit?/:page?', backlogController.getBacklogTasksResponse);

router.post('/backlog', backlogController.addBacklogTaskResponse);

// router.patch('/backlog/:task_id', backlogController.cancelBacklogTaskResponse);
router.delete('/backlog/:initiativeId/:taskId', backlogController.addBacklogTaskToActivityPlanResponse);

module.exports  = router