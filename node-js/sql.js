var mysql = require('mysql');

var fs = require('fs')
var ini = require('ini')

var config = ini.parse(fs.readFileSync('./conf.ini', 'utf-8'));

//console.log(config.server.host, config.server.user, config.server.password, config.server.port);

var con = mysql.createConnection({
    host: config.server.host,
    user: config.server.user,
    password: config.server.password,
    port: config.server.port,
});



con.connect(function (err) {
    //if (err) throw err;
    console.log("connect success!")
});

con.end(function (err) {
    //if (err) throw err;
    console.log('connect end');
})

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.write("test: ");
    res.end();
});

var sever = app.listen(3000, function () {
    console.log('listening on port 3000');
});

