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
        if (rows.length == 0) {
            res.status(404).json({ status: 404 });
        }
        else {
            state.event = rows;
            console.log(rows);
        }
    });
}
exports.addEvent = function (req, res) {
    var id = req.query.id;
    var title = req.query.title;
    var content = req.query.content;
    var startDate = req.query.startDate;
    var startTime = req.query.startTime;
    var endDate = req.query.endDate;
    var endTime = req.query.endTime;

    var delete_stuff = "DELETE FROM Stuff WHERE stuff_ID = '" + id + "'";
    conn.query(delete_stuff, function (err, result) {
        if (err) {
            console.log("Delete stuff " + id + " failed");
        }
    });

    var addevent = "INSERT INTO event(account_ID, time_start_date, time_start_time,time_end_date,time_end_time, buf_time, title, content, status) VALUE('" +
        testuser + "','" + startDate + "','" + startTime + "','" + endDate + "','" + endTime + "','00:30:00','" + title + "','" + content + "','N');";
    conn.query(addevent, function (err, result) {
        if (err) {
            console.log("AddEvent " + title + " failed");
            res.status(404).json({ status: 404 });
        }
        else {
            console.log("AddEvent " + title + "correct");
            res.status(200).json({ status: 200 });
        }
    })
};