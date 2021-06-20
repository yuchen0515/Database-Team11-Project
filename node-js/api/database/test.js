var mysql = require('mysql');

var fs = require('fs')
var ini = require('ini')

var config = ini.parse(fs.readFileSync('./conf.ini', 'utf-8'));


var conn = mysql.createConnection({
    host: config.server.host,
    user: config.server.user,
    password: config.server.password,
    port: config.server.port,
    //database: config.server.user,
});

var sql = fs.readFileSync('../../../DDL.sql').toString();
//console.log(sql)
conn.connect(function (err) {
    console.log("Connect");
});
conn.end();
/*
conn.connect(function (err) {
    //if (err) throw err;
    console.log("Connected!");
    conn.query(sql, function (err) {
        //console.log(sql);
        console.log("ok");
    });
});

conn.end();*/