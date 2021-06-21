var conn = require('./sql.js').conn;

exports.addproject = function (req, res) {
    var user = req.query.username;
    var deadline_date = req.query.deadline_date;
    var deadline_time = req.query.deadline_time;
    var importance = req.query.importance;
    var title = req.query.title;
    var tag = req.query.tag;
    var intro = req.query.intro;

    var addproject = "INSERT INTO project (account_ID, deadline_date, deadline_time, importance, title, tag, intro, status) VALUES ('"
        + user + "'," + deadline_date + "," + deadline_time + ",'" + importance + "','" + title + "','" + tag + "','" + intro + "','N');";
    console.log(addproject);
    conn.query(addproject, function (err, result) {
        if (err) {
            console.log("err 404: user-" + user + " addproject failed");
            res.status(404).json({ status: 404 });
        }
        else {
            console.log("ok 200: user-" + user + " addproject successed");
            res.status(200).json({ status: 200 });
        }
    });
};
exports.loadproject = function (req, res) {
    var user = req.query.username;
    var tag = req.query.tag;
    var array = new Array();
    var array = tag.split(" ");

    var loadproject = "SELECT * FROM project WHERE account_ID = '" + user + "' and (";

    for (i in array) {
        loadproject += "tag like '%" + array[i] + "%' or ";
    }
    loadproject = loadproject.slice(0, -4);
    loadproject += ");";

    console.log(loadproject);

    conn.query(loadproject, function (err, rows, fields) {
        if (err) {
            console.log("err 404: user-" + user + " loadproject err");
            res.status(404).json({ status: 404 });
        }
        else if (rows.length == 0) {
            console.log("err 403: user-" + user + " loadproject empty");
            res.status(403).json({ status: 403 });
        }
        else {
            console.log("ok 200: user-" + user + " loadproject successed");
            res.status(200).json({ status: 200, events: rows });
        }
    });

};