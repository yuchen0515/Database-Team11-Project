var express = require('express');
var router = express.Router();

var login = require('../database/login')

router.post('/',
    login.login
);
router.post('/',
    login.logout
);
/*
router.get('*', function (req, res) {
    res.send('404 not found');
});
*/
module.exports = router;