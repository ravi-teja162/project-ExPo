const express = require('express');
const router = express.Router();

/* GET teamsRouter . */
router.get('/', function (req, res, next) {
    res.send("/team")
});

router.get('/new', function (req, res, next) {
    res.send("/teams/new")
});

router.post('/', function (req, res, next) {
    res.send("CREATE /teams")
});
router.get('/:id', function (req, res, next) {
    res.send("SHOW /teams/:id")
});
router.get('/:id/edit', function (req, res, next) {
    res.send("EDIT /teams/:id")
});
router.put('/:id', function (req, res, next) {
    const { id } = req.params;
res.send("UPDATE /teams/:id")
});

router.delete('/:id', function (req, res, next) {
    res.send("DESTROY /teams/:id")
});




module.exports = router;
