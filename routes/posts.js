const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({'dest':'uploads/'});
const {asyncErrorHandler} = require("../middleware");
const { checkIfUserExists, isLoggedIn } = require('../middleware/users.js');

const {postIndex,postCreate,postProject,postNewProject,postNewPaper,postNewIdea,postNewEvent,postShow,postEdit,postDelete,postUpdate, postInnovation,postPaper,postEvent,postIdea,} = require('../controllers/posts');
/* GET postsRouter . */
router.get('/', asyncErrorHandler(postIndex));
router.get('/projects', asyncErrorHandler(postProject));
router.get('/ideas', asyncErrorHandler(postIdea));
router.get('/events', asyncErrorHandler(postEvent));
router.get('/papers', asyncErrorHandler(postPaper));


//Get a new post
router.get('/newProject', postNewProject);
router.get('/newIdea', postNewIdea);
router.get('/newPaper', postNewPaper);
router.get('/newEvent', postNewEvent);

// Create a new post
router.post('/', upload.array('images',4), isLoggedIn, asyncErrorHandler(postCreate));

// Show posts
router.get('/:id',asyncErrorHandler(postShow))

router.get('/:id/edit', asyncErrorHandler(postEdit));

router.put('/:id', postUpdate)


router.delete('/:id', asyncErrorHandler(postDelete));




module.exports = router;
