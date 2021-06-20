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
            console.log("addproject err");
            res.status(404).json({ status: 404 });
        }
        else {
            console.log("addproject success");
            res.status(200).json({ status: 200 });
        }
    });
};
exports.loadproject = function (req, res) {
    var user = req.query.username;
    var tag = req.query.tag;
    var array = new Array();
    var array = tag.split(" ");

    var loadproject = "SELECT * FROM project WHERE account_ID = '" + user + "' and tag like ";

    for (i in array) {
        loadproject += "'%" + array[i] + "%' ";
    }
    loadproject += ";";

    console.log(loadproject);
    /*
        conn.query(loadproject, function (err, rows, fields) {
            if (err) {
                console.log("addproject err");
                res.status(404).json({ status: 404 });
            }
            else if (rows.length == 0) {
                console.log("addproject empty");
                res.status(403).json({ status: 403 });
            }
        });
    */
};