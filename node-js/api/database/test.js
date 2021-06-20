var conn = require('./sql.js').conn;

var user = "testuser";

var test = "SELECT title, content, stuff_ID FROM stuff WHERE account_ID = 'testuser' ORDER BY 'left(record_date_date,10)' ASC, 'record_date_time' ASC";

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