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
    //console.log(addproject);
    conn.query(addproject, function (err, result) {
        if (err) {
            console.log("err 404: user-" + user + " addproject failed");
            res.status(404).json({ status: 404 });
        }
        else {
            var project_ID = "SELECT LAST_INSERT_ID() as id;"
            conn.query(project_ID, function (err, rows, fields) {
                if (err) {
                    console.log("err 404: user-" + user + " addproject failed can't find project_ID");
                    res.status(404).json({ status: 404 });
                }
                else {
                    console.log("ok 200: user-" + user + " addproject successed");
                    res.status(200).json({ status: 200, id: rows[0].id });
                }
            });
        }
    });
};
exports.loadproject = function (req, res) {
    var user = req.query.username;
    var tag = req.query.tag;
    var array = new Array();
    var array = tag.split(" ");

    var loadproject = "SELECT p.project_ID AS id, p.title, p.intro, p.tag, p.importance, p.deadline_date, p.deadline_time, p.highlight ,GROUP_CONCAT('{destination:\"', destination ,'\""
        + "}') as taskList FROM project AS p LEFT OUTER JOIN task ON p.project_ID = task.project_ID WHERE account_ID = '"
        + user + "' and (";

    for (i in array) {
        if (array[i] != '') {
            loadproject += "tag like '%" + array[i] + "%' or ";
        }
    }
    loadproject = loadproject.slice(0, -4);
    loadproject += ") GROUP BY p.project_ID;";

    //console.log(loadproject);

    conn.query(loadproject, async function (err, rows, fields) {
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
            //console.log(rows[0].taskList);
            res.status(200).json({ status: 200, events: rows });
        }
    });
};
exports.finishedproject = function (req, res) {
    var id = req.query.id;
    var user = req.query.username;

    var finished = "UPDATE project SET status = 'Y' WHERE project_ID = " + id + ";";

    conn.query(finished, function (err, result) {
        if (err) {
            console.log("err 404: user-" + user + " finishedproject-" + id + " failed");
            res.status(404).json({ status: 404 });
        }
        else {
            console.log("ok 200: user-" + user + " finishedproject-" + id + " successed");
            res.status(200).json({ status: 200 });
        }
    });
};