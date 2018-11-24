const router = require('express').Router();

const teamCopyController = require('./teamCopy.controller');

router.get('/teamCopy',teamCopyController.getTeamCopyResponse);
router.patch('/teamCopy/:date/tasks/:taskId', teamCopyController.updateTeamCopyResponse);

module.exports = router
