var express = require('express');
var router = express.Router();

var stuff = require('../database/stuff')

router.post('/',
    stuff.addStuff
);
router.get('/',
    stuff.loadStuff
);


module.exports = router;