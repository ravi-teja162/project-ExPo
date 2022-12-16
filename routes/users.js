const express = require('express');
const passport = require('passport');
const multer = require('multer');
const upload = multer({'dest':'uploads/'});
const { postRegister, postLogin, getLogout, getLogin, getRegister, getProfile, profileShow } = require('../controllers/users');
const { asyncErrorHandler } = require('../middleware/index.js');
const { checkIfUserExists, isLoggedIn } = require('../middleware/users.js');
const router = express.Router();

/* GET users listing. */
/* GET postsRouter . */
router.get('/register', getRegister);
router.post('/register', upload.array('profilePic',1) ,asyncErrorHandler(checkIfUserExists), asyncErrorHandler(postRegister))

router.get('/login', getLogin);


router.post('/login', asyncErrorHandler(postLogin));

router.get('/logout', getLogout);

// router.get('/profile', isLoggedIn, asyncErrorHandler(getProfile));
router.get('/:id',asyncErrorHandler(profileShow))

router.put('/profile/:user_id', asyncErrorHandler(getProfile))

router.get('/forgot-password', function (req, res, next) {
  res.send("GET /forgot-password")
});

router.put('/forgot-password', function (req, res, next) {
  res.send("PUT /forgot-password")
});

router.get('/reset-password/:token', function (req, res, next) {
  res.send("GET /forgot-password/:token")
});

router.put('/reset-password/:token', function (req, res, next) {
  res.send("GET /forgot-password/:token")
});



module.exports = router;
