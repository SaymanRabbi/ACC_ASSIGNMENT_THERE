const express = require('express');
const { getAllCandidate,candidateWithId} = require('../Controller/admin.controler');
const { verifyAdmin } = require('../Middleware/admin');
const verifyToken = require('../Middleware/verifyToken');
const router = express.Router();
router.get('/allcandidate',verifyToken,verifyAdmin,getAllCandidate)
router.get('/candidate/:id',verifyToken,verifyAdmin,candidateWithId)
module.exports = router