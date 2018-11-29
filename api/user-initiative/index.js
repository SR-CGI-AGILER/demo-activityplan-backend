const router = require('express').Router();
const userInitiativeController = require('./user-initiative.controller');

router.get('/user/initiatives/:userId', userInitiativeController.getInitiativesResponse);

router.post('/user/initiative', userInitiativeController.addInitiativeResponse)

module.exports = router
