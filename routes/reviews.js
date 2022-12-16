const express = require('express');
const router = express.Router();

/* GET reviesRouter . */
router.get('/', function (req, res, next) {
    res.send("INDEX /posts/:id/reviews")
});

router.post('/', function (req, res, next) {
    res.send("CREATE /reviews")
});

router.get('/:review_id/edit', function (req, res, next) {
    res.send("EDIT /posts/:id/reviews/:id")
});
router.put('/:review_id', function (req, res, next) {
    const { id } = req.params;
res.send("UPDATE /posts/:id/reviews/:id")
});
router.delete('/:review_id', function (req, res, next) {
    res.send("DESTROY /posts/:id/reviews/:id")
});




module.exports = router;
