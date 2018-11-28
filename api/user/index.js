const router = require('express').Router();
// const activityController = require('./activity.controller')

const userController = require('./user.controller')

router.post('/auth/google',userController.loginWithGoogle);


module.exports = router