var conn = require('./sql.js').conn;

exports.loadEvent = function (req, res) {
    var start_date = req.query.start;
    var end_date = req.query.end;
    var user = req.query.username;


    var sql = "SELECT account_ID, CONCAT(left(time_start_date,10),'T',time_start_time) as start, CONCAT(left(time_end_date,10),'T',time_end_time) as end, content as details, title as name, 0 as timed, 'primary' as color FROM Event WHERE time_start_date BETWEEN " + start_date +
        " AND " + end_date + " AND time_end_date BETWEEN " + start_date + " AND " + end_date + " AND account_ID = '" + user + "';";
    //console.log(sql);
    conn.query(sql, function (err, rows, fields) {
        if (err) {
            console.log("err 404: user-" + user + " loadevent failed");
            res.status(404).json({ status: 404 });
        }
        else if (rows.length == 0) {
            console.log("err 403: user-" + user + " no match event between " + start_date + " and " + end_date);
            res.status(403).json({ status: 404, events: "[]" });
        }
        else {
            console.log("ok 200: user-" + user + " match event successed");
            res.status(200).json({ status: 200, events: rows });
            //console.log(rows);
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
    var user = req.query.username;

    var delete_stuff = "DELETE FROM Stuff WHERE stuff_ID = '" + id + "' and account_id = '" + user + "';";
    conn.query(delete_stuff, function (err, result) {
        if (err) {
            console.log("err 404: user-" + user + " addevent-deletestuff " + id + " failed");
            res.status(404).json({ status: 404 });
        }
        else {
            var addevent = "INSERT INTO event(account_ID, time_start_date, time_start_time,time_end_date,time_end_time, buf_time, title, content, status) VALUE('" +
                user + "','" + startDate + "','" + startTime + "','" + endDate + "','" + endTime + "','00:30:00','" + title + "','" + content + "','N');";
            conn.query(addevent, function (err, result) {
                if (err) {
                    console.log("err 404: user-" + user + " addevent " + title + " failed");
                    res.status(404).json({ status: 404 });
                }
                else {
                    console.log("ok 200: user-" + user + " addevent " + title + " successed");
                    res.status(200).json({ status: 200 });
                }
            });
        }
    });

};