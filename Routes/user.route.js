const express = require('express');
const { CreateUserContoler, loginUserControler,getUserInfo } = require('../Controller/user.contoler');
const verifyToken = require('../Middleware/verifyToken');
const router= express.Router();
// Importing the controller
router.post('/register',CreateUserContoler)
/**
 * user Route
 * Api Example: http://localhost:5000/api/v1/user/register  
 * use body to send data
 * @param {string} name - user name
 * @param {string} email - user email
 * @param {string} password - user password
 * @param {string} role - user role
 */
router.post('/login',loginUserControler)
/**
 * user Route
 * Api Example: http://localhost:5000/api/v1/user/login
 * use body to send data
 * @param {string} email - user email
 * @param {string} password - user password
 * @returns {object} 200 - An array of user info and token
*/
router.get('/me',verifyToken,getUserInfo)
/**
 * user Route
 * Api Example: http://localhost:5000/api/v1/user/me
 * use toke to get data
 * @headers {string} token - user token
 * @returns {object} 200 - An array of user info
*/
module.exports = router;