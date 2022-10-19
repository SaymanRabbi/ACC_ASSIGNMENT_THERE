const express = require('express');
const { getAllCandidate,candidateWithId,gethiringmanagers,getuserwithId} = require('../Controller/admin.controler');
const { verifyAdmin } = require('../Middleware/admin');
const verifyToken = require('../Middleware/verifyToken');
const router = express.Router();
router.patch('/user/:id',verifyToken,verifyAdmin,getuserwithId)
/**
 * Admin Route only for admin
 * Api Example: http://localhost:5000/api/v1/admin/user/634fad28987f1381153bb283  
 * @param {string} id - user id
 * @returns {object} 200 - An array of user info and update role
 */
router.get('/allcandidate',verifyToken,verifyAdmin,getAllCandidate)
/**
 * Admin Route only for admin
 * Api Example: http://localhost:5000/api/v1/admin/candidate/634fad28987f1381153bb283  
 * @param {string} id - user id
 */
router.get('/candidate/:id',verifyToken,verifyAdmin,candidateWithId)
/**
 * Admin Route only for admin
 * Api Example: http://localhost:5000/api/v1/admin/candidate/634fad28987f1381153bb283  
 * @param {string} id - user id
 */
router.get('/hiringmanagers',verifyToken,verifyAdmin,gethiringmanagers)
/**
 * Admin Route only for admin
 * Api Example: http://localhost:5000/api/v1/admin/hiringmanagers  
 * @param {string} id - user id
 * @returns {object} 200 - An array of  info
 */
module.exports = router