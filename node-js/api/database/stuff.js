var conn = require('./sql.js').conn;

exports.addStuff = function (req, res) {
    var title = req.query.title;
    var content = req.query.content;
    var user = req.query.username;
    var time = new Date();

    var record_date = time.getFullYear() + "-" + time.getMonth() + 1 + "-" + time.getDate();
    var record_time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();

    var addstuff = "INSERT INTO stuff(account_ID,record_date_date,record_date_time,title,content,status) VALUES('"
        + user + "','" + record_date + "','" + record_time + "','" + title + "','" + content + "','N');"

    conn.query(addstuff, function (err, result) {
        if (err) {
            console.log("addstuff failed");
            res.status(404).json({ status: 404 });
        }
        else {
            console.log("addstuff succeeded");
            res.status(200).json({ status: 200 });
        }
    })

};
exports.loadStuff = function (req, res) {
    var user = req.query.username;
    var test = "SELECT title, content, stuff_ID FROM stuff WHERE account_ID = '" + user + "' ORDER BY 'left(record_date_date,10)' ASC, 'record_date_time' ASC";

    conn.query(test, function (err, rows, fields) {
        if (err) {
            console.log("unknow error");
            res.status(404).json({ status: 404 });
        }
        else if (rows.length == 0) {
            console.log("no match stuff");
            res.status(404).json({ status: 404 });
        }
        else {
            res.status(200).json({ status: 200, events: rows });
            //console.log(rows);
        }
    });
};
exports.deleteStuff = function (req, res) {
    var stuff_ID = req.query.stuff_ID;

    var deleteStuff = "DELETE FROM stuff WHERE stuff_ID = " + stuff_ID;

    conn.query(deleteStuff, function (err, result) {
        if (err) {
            console.log("err deleteStuff no " + stuff_ID + " in stuff");
            res.status(403).json({ status: 403 });
        }
        else {
            console.log("deleteStuff succeeded");
            res.status(200).json({ status: 200 });
        }
    })
};