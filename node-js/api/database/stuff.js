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
    var test;
};