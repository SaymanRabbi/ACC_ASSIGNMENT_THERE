const express = require('express');
const { CreateJobContoler } = require('../Controller/job.contoler');
const { authorization } = require('../Middleware/authorization');
const router= express.Router();
const verifyToken = require('../Middleware/verifyToken');
// Importing the controller
router.post('/',verifyToken,authorization('Hrmanager'),CreateJobContoler)

module.exports = router;