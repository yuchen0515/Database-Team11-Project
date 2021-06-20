var express = require('express');
var router = express.Router();

var event = require('../database/event')

router.get('/event',
    event.loadEvent
);
router.post('/event',
    event.addEvent
);
/*
router.get('*', function (req, res) {
    res.send('404 not found');
});
*/
module.exports = router;