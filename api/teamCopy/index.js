const router = require('express').Router();

const teamCopyController = require('./teamCopy.controller');

router.get('/teamCopy',teamCopyController.getTeamCopyResponse);

module.exports = router
