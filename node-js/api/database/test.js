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

export { conn };

//var sql = fs.readFileSync('../../../DDL.sql').toString();

//var test = fs.readFileSync('./test1.txt').toString();
//console.log(test);

conn.connect(function (err) {
    //if (err) throw err;
    console.log("Database Connected!");
    /*
    conn.query(sql, function (err) {
        //console.log(sql);
        console.log("ok");
    });*/
});
/*
var test = "INSERT INTO Event VALUES ('90162423','25780832','1939-04-13','06:43:13','1733-03-12','15:56:57','12:22:45','tr','5I8HWub04vAEi83nE8D383lJi99E4rgzE4DVwih','65');";

conn.query(test, function (err) {
    if (err) console.log("Insert Event error");
    //console.log(test);
    else console.log("Insert Event correct")
});*/
/*
var check = "SELECT * FROM UserData"
conn.query(check, function (err, rows, fields) {
    console.log(rows);
    console.log(rows[0].account_ID)
});
*/
conn.end();