var express = require('express');
var router = express.Router();

var login = require('../database/login')

router.get('/login',
    login.login_get
);

router.get('/', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.write("test: ");
    res.end();
});

router.get('*', function (req, res) {
    res.send('404 not found');
});

module.exports = router;