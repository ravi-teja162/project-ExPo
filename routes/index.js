const express = require('express');
const Users = require('../models/user');
const Posts = require('../models/post')
const router = express.Router();
const { landingPage,about } = require('../controllers');
const {	asyncErrorHandler} = require('../middleware')

/* GET home page. */
router.get('/', asyncErrorHandler(landingPage));

router.get('/about', about);



module.exports = router;
