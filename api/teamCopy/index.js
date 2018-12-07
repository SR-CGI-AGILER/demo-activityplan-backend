const router = require('express').Router();

const teamCopyController = require('./teamCopy.controller');

router.get('/teamCopy',teamCopyController.getTeamCopyResponse);
router.patch('/teamCopy/:date/:initiativeId', teamCopyController.updateTeamCopyResponse);
router.post('/teamCopy/:date/:initiativeId', teamCopyController.addToTeamCopyResponse);
router.patch('/updateTeamCopy/owner/:initiativeId', teamCopyController.assignOwner)
module.exports = router
