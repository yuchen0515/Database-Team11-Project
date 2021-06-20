var express = require('express');
var router = express.Router();

var register = require('../database/register')

router.post('/',
    register.register
);
/*
router.get('/register',
    register
);
*/

module.exports = router;