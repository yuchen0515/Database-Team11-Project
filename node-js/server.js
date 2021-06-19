var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(
    connectionConfig
);

var express = require('express')
    , app = express();
var login = require('./api/model/login');
var event = require('./api/model/event');

app.use(session({
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', login);
app.use('/api', event);

var sever = app.listen(3000, function () {
    console.log('listening on port 3000');
});