var mysql = require('mysql');

var fs = require('fs')
var ini = require('ini')

var config = ini.parse(fs.readFileSync('./conf.ini', 'utf-8'));

var conn = mysql.createConnection({
    host: config.server.host,
    user: config.server.user,
    password: config.server.password,
    port: config.server.port,
    //database: 'team11',
});

exports.get_event_by_time = function (req, res, start_date, end_date) {
    var sql = "SELECT * FROM Event WHERE time_start_date BETWEEN " + start_date +
        " AND " + end_date + " AND time_end_date BETWEEN " + start_date + " AND " + end_date;
    conn.connect(function (err) {
        //if (err) throw err;
    });
    conn.query(sql, function (err, rows, fields) {
        //if (err) throw err;
        console.log(rows);
    });
}

var start_date = new Date(2020, 6, 19);
var end_date = new Date(2021, 6, 19);
start_date = start_date.toISOString().slice(0, 10);
end_date = end_date.toISOString().slice(0, 10);
var sql = "SELECT * FROM Event WHERE time_start_date BETWEEN " + start_date +
    " AND " + end_date + " AND time_end_date BETWEEN " + start_date + " AND " + end_date;
conn.connect(function (err) {
    //if (err) throw err;
});
conn.query(sql, function (err, rows, fields) {
    //if (err) throw err;
    console.log("do: " + sql);
    console.log(rows);
});
conn.end();