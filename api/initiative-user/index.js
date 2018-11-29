const router = require('express').Router();
const initiativeUserController = require('./initiative-user.controller');

router.get('/initiative/users/:initiativeId',initiativeUserController.getUsers);

router.post('/initiative/user', initiativeUserController.postUsers);
router.post('/initiative/new', initiativeUserController.createNewInitiativeResponse);

module.exports = router