var conn = require('./sql.js').conn;

exports.loadEvent = function (req, res) {
    var start_date = req.query.start;
    var end_date = req.query.end;
    var account_ID;

    console.log("load_event call");
    var sql = "SELECT * FROM Event WHERE time_start_date BETWEEN " + start_date +
        " AND " + end_date + " AND time_end_date BETWEEN " + start_date + " AND " + end_date + " AND account_ID = '" + account_ID + "'";
    conn.query(sql, function (err, rows, fields) {
        //if (err) throw err;
        console.log(rows);
    });
}