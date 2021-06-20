var conn = require('./api/database/sql.js').conn;
/*var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(
    conn
);*/

var express = require('express')
    , app = express();
var login = require('./api/model/login')
    , event = require('./api/model/event')
    , register = require('./api/model/register')
    , stuff = require('./api/model/stuff');
/*
app.use(session({
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
}));*/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/login', login);
app.use('/api/event', event);
app.use('/api/register', register);
app.use('./api/stuff', stuff);

app.route('/api/*')
    .get(function (req, res) {
        console.log("get error url");
        res.status(403).json({ status: 403 });
    })
    .post(function (req, res) {
        console.log("post error url");
        res.status(403).json({ status: 403 });
    });

var sever = app.listen(3000, function () {
    console.log('listening on port 3000');
});