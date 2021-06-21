var express = require('express');
var router = express.Router();

var project = require('../database/project')

router.post('/',
    project.addproject
);
router.get('/',
    project.loadproject
);
router.put('/',
    project.finishedproject
);
router.put('/addhighlight',
    project.addhighlight
);
router.put('/subhighlight',
    project.subhighlight
);

module.exports = router;