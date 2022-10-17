const express = require('express');
const { CreateUserContoler } = require('../Controller/user.contoler');
const router= express.Router();
// Importing the controller
router.post('/',CreateUserContoler)

module.exports = router;