var express = require('express')
    , app = express();
var login = require('./api/model/login');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', login);


var sever = app.listen(3000, function () {
    console.log('listening on port 3000');
});