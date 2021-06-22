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
    var array = tag.split(' ');

    var loadproject = 'SELECT p.project_ID AS id, p.title, p.intro, p.tag, p.importance, left(p.deadline_date,10) as deadline_date , p.deadline_time, p.highlight ,  CONCAT(\'[\', GROUP_CONCAT(CONCAT(\'{"destination":"\', destination, \'"}\')), \']\')' //'{destination:" + '"' + "', destination ,'" + '"' + '
        + " as taskList FROM project AS p LEFT OUTER JOIN task ON p.project_ID = task.project_ID WHERE p.status =\'N\' AND account_ID = \'"
        + user + "\' and (";

    var check = 0;
    for (i in array) {
        if (array[i] != '' && array[i] != '\"\"' && array[i] != "" && array[i] != '\"') {
            //console.log(array[i])
            check = 1;
            loadproject += "tag like \'%" + array[i] + "%\' or ";
        }
    }
    if (check == 1) {
        //console.log(check);
        loadproject = loadproject.slice(0, -4);
        loadproject += ") GROUP BY p.project_ID;";
    }
    else {
        loadproject = loadproject.slice(0, -5);
        loadproject += " GROUP BY p.project_ID;";
    }

    //console.log(loadproject);

    conn.query(loadproject, async function (err, rows, fields) {
        if (err) {
            //console.log(err)
            console.log("err 404: user-" + user + " loadproject err");
            res.status(404).json({ status: 404 });
        }
        else if (rows.length == 0) {
            console.log("err 403: user-" + user + " loadproject empty");
            res.status(403).json({ status: 403 });
        }
        else {
            //results = results.map(row => (row.package = JSON.parse(row.package), row));
            //rows = rows.map(row => (row.package = JSON.parse(row.package), row));
            console.log("ok 200: user-" + user + " loadproject successed");
            //console.log(JSON.stringify(rows));
            //console.log(JSON.parse(rows));
            //rows = rows.map(row => (row.package = JSON.parse(row.package), row));
            // rows = JSON.parse(rows)
            //console.log(rows)
            rows = rows.map(row => (row.taskList = JSON.parse(row.taskList), row))
            //console.log(JSON.stringify(rows))
            res.status(200).json({ status: 200, events: JSON.stringify(rows) });
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
exports.addhighlight = function (req, res) {
    var id = req.query.id;
    var user = req.query.username;

    var getproject = "SELECT p.highlight as highlight, p.account_ID as account_ID, count(task.task_ID) as count FROM project as p LEFT OUTER JOIN task ON p.project_ID = task.project_ID WHERE p.project_ID = " + id + " GROUP BY p.project_ID;";
    //console.log(getproject);
    conn.query(getproject, function (err, rows, fields) {
        if (err) {
            console.log("err 404: addhighlight get project_ID-" + id + " failed");
            res.status(404).json({ status: 404 });
        }
        else {
            if (rows[0].count == 0) {
                console.log("err 403: addhighlight project-" + id + " has no any tasks");
                res.status(403).json({ status: 403 });
            }
            else if (rows[0].account_ID != user) {
                console.log("err 403: addhighlight project-user-" + rows[0].account_ID + " not user-" + user);
                res.status(403).json({ status: 403 });
            }
            else {
                if (rows[0].count == 1) {
                    console.log("err 403: addhighlight project-" + id + " user-" + rows[0].account_ID + " has no other tasks");
                    res.status(403).json({ status: 403 });
                }
                else if (rows[0].highlight < (rows[0].count - 1) && rows[0].highlight >= 0) {
                    var update = "UPDATE project SET highlight = " + rows[0].highlight + " + 1 WHERE project_ID = " + id + ";"
                    conn.query(update, function (err, result) {
                        if (err) {
                            console.log("err 404: user-" + user + " addhighlight-updateproject failed");
                            res.status(404).json({ status: 404 });
                        }
                        else {
                            console.log("ok 200: user-" + user + " addhighlight-updateproject successed");
                            res.status(200).json({ status: 200 });
                        }
                    });
                }
                else {
                    console.log("err 403: user-" + user + " addhighlight highlight out of range 0~" + (rows[0].count - 1));
                    res.status(403).json({ status: 403 });
                }

            }
        }
    });
};
exports.subhighlight = function (req, res) {
    var id = req.query.id;
    var user = req.query.username;

    var getproject = "SELECT p.highlight as highlight, p.account_ID as account_ID, count(task.task_ID) as count FROM project as p LEFT OUTER JOIN task ON p.project_ID = task.project_ID WHERE p.project_ID = " + id + " GROUP BY p.project_ID;";
    conn.query(getproject, function (err, rows, fields) {
        if (err) {
            console.log("err 404: subhighlight get project_ID-" + id + " failed");
            res.status(404).json({ status: 404 });
        }
        else {
            if (rows[0].count == 0) {
                console.log("err 403: subhighlight project-" + id + " has no any tasks");
                res.status(403).json({ status: 403 });
            }
            else if (rows[0].account_ID != user) {
                console.log("err 403: subhighlight project-user-" + rows[0].account_ID + " not user-" + user);
                res.status(403).json({ status: 403 });
            }
            else {
                if (rows[0].count == 1) {
                    console.log("err 403: subhighlight project-" + id + " user-" + rows[0].account_ID + " has no other tasks");
                    res.status(403).json({ status: 403 });
                }
                else if (rows[0].highlight <= (rows[0].count - 1) && rows[0].highlight > 0) {
                    var update = "UPDATE project SET highlight = " + rows[0].highlight + " - 1 WHERE project_ID = " + id + ";"
                    conn.query(update, function (err, result) {
                        if (err) {
                            console.log("err 404: user-" + user + " subhighlight-updateproject failed");
                            res.status(404).json({ status: 404 });
                        }
                        else {
                            console.log("ok 200: user-" + user + " subhighlight-updateproject successed");
                            res.status(200).json({ status: 200 });
                        }
                    });
                }
                else {
                    console.log("err 403: user-" + user + " subhighlight highlight out of range 0~" + (rows[0].count - 1));
                    res.status(403).json({ status: 403 });
                }

            }
        }
    });
};