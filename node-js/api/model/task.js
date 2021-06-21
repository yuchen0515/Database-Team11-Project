var express = require('express');
var router = express.Router();

var task = require('../database/task')

router.post('/',
    task.addTask
);

module.exports = router;