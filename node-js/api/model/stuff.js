var express = require('express');
var router = express.Router();

var stuff = require('../database/stuff')

router.post('/stuff',
    stuff.addStuff
);
router.get('/stuff',
    stuff.loadStuff
);


module.exports = router;