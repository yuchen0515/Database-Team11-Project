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

var sql = fs.readFileSync('../../../DDL.sql').toString();

//var test = fs.readFileSync('./test1.txt').toString();
//console.log(test);

conn.connect(function (err) {
    //if (err) throw err;
    console.log("Connected!");
    /*
    conn.query(sql, function (err) {
        //console.log(sql);
        console.log("ok");
    });*/
});
/*
conn.query(test, function (err) {
    console.log(test);
    console.log("insert");
});
*/
var check = "SELECT * FROM UserData"
conn.query(check, function (err, rows, fields) {
    console.log(rows);
    console.log(rows[0].account_ID)
});

conn.end();