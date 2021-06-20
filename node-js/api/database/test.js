var conn = require('./sql.js').conn;

var user = "testuser";

var sql = "SELECT account_ID, time_start_time, time_end_time, content, '0' as timed FROM Event WHERE time_start_date BETWEEN " + "'2020-01-01'" +
    " AND " + "'2021-07-21'" + " AND time_end_date BETWEEN " + "'2020-01-01'" + " AND " + "'2021-07-21'" + " AND account_ID = '" + user + "';";
var test = "SELECT CONCAT(left(time_start_date,10),'T',time_start_time) as start FROM Event;";
console.log(test);
conn.query(test, function (err, rows, fields) {
    if (err) {
        console.log("unknow error");
        //res.status(404).json({ status: 404 });
    }
    else if (rows.length == 0) {
        console.log("0");
        //res.status(404).json({ status: 404 });
    }
    else {
        //res.status(200).json({ status: 200, events: rows });
        console.log(rows);
    }
});
conn.end();