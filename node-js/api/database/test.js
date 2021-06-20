var mysql = require('mysql');

var fs = require('fs')
var ini = require('ini')

var config = ini.parse(fs.readFileSync('./conf.ini', 'utf-8'));

var conn = mysql.createConnection({
    host: config.server.host,
    user: config.server.user,
    password: config.server.password,
    port: config.server.port,
    database: config.server.user,
});

conn.connect(function (err) {
    console.log("Database Connected!");
});

conn.end();