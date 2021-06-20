//var conn = require('./sql.js').conn;
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

exports.get_event_by_time = function (req, res, start_date, end_date) {
    console.log("get_event_by_time call");
    var sql = "SELECT * FROM Event WHERE time_start_date BETWEEN " + start_date +
        " AND " + end_date + " AND time_end_date BETWEEN " + start_date + " AND " + end_date;
    conn.connect(function (err) {
        //if (err) throw err;
    });
    conn.query(sql, function (err, rows, fields) {
        //if (err) throw err;
        console.log(rows);
    });
    conn.end();
}