var express = require('express');
var router = express.Router();

var login = require('../database/login')

router.post('/login',
    login.login
);
router.post('/logout',
    login.logout
);
/*5f4dcc3b5aa765d61d8327deb882cf99
router.get('*', function (req, res) {
    res.send('404 not found');
});
*/
module.exports = router;
