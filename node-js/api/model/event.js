var express = require('express');
var router = express.Router();

var event = require('../database/event')

router.get('/',
    event.loadEvent
);
router.post('/',
    event.addEvent
);

module.exports = router;