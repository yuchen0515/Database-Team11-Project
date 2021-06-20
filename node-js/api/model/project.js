var express = require('express');
var router = express.Router();

var project = require('../database/project')

router.post('/',
    project.addproject
);

module.exports = router;