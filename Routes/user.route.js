const express = require('express');
const { CreateUserContoler, loginUserControler,getUserInfo } = require('../Controller/user.contoler');
const verifyToken = require('../Middleware/verifyToken');
const router= express.Router();
// Importing the controller
router.post('/register',CreateUserContoler)
router.post('/login',loginUserControler)
router.get('/me',verifyToken,getUserInfo)

module.exports = router;