var express = require('express');
var router = express.Router();

var event = require('../database/event')

router.post('/event/get_event_by_time',
    event.get_event_by_time
);
/*
router.get('/', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.write("test: ");
    res.end();
});

router.get('*', function (req, res) {
    res.send('404 not found');
});
*/
module.exports = router;