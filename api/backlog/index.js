const router = require('express').Router();
const backlogController = require('./backlog.controller')

router.get('/backlog/:initiativeId/:limit?/:page?', backlogController.getBacklogTasksResponse);

router.post('/backlog/:initiativeId', backlogController.addBacklogTaskResponse);

router.patch('/backlog/owner/:initiativeId',backlogController.assignOwnerResponse);

// router.patch('/backlog/:task_id', backlogController.cancelBacklogTaskResponse);
router.delete('/backlog/:initiativeId/:taskId', backlogController.addBacklogTaskToActivityPlanResponse);

module.exports  = router