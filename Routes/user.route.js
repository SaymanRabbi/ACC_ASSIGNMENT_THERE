const express = require('express');
const { CreateUserContoler, loginUserControler } = require('../Controller/user.contoler');
const router= express.Router();
// Importing the controller
router.post('/register',CreateUserContoler)
router.post('/login',loginUserControler)

module.exports = router;