var conn = require('./sql.js').conn;

exports.addTask = function (req, res) {
    var destination = req.query.destination;
    //var time_date = req.query.time_date;
    //var time_time = req.query.time_time;
    var id = req.query.id;
    var username = req.query.username;

    var time_date = "'00-00-07'";
    var time_time = "'00:30:00'";

    var addtask = "INSERT INTO task (project_ID, destination, time_req_date, time_req_time, status) VALUES ("
        + id + ",'" + destination + "'," + time_date + "," + time_time + ",'N');";
    //console.log(addtask);
    conn.query(addtask, function (err, result) {
        if (err) {
            console.log("err 404: user-" + username + " addtask " + id + " failed");
            res.status(404).json({ status: 404 });
        }
        else {
            var last = "SELECT LAST_INSERT_ID() AS task_ID;";
            conn.query(last, function (err, rows, fields) {
                var updateproject = "UPDATE project SET highlight = " + rows[0].task_ID + " WHERE project_ID = " + id + ";";
                //console.log(updateproject);
                conn.query(updateproject, function (err, result) {
                    if (err) {
                        console.log("err 404: addtask-updateproject-" + id + " failed");
                        res.status(404).json({ status: 404 });
                    }
                    else {
                        console.log("ok 200: user-" + username + " addtask " + id + " successed");
                        res.status(200).json({ status: 200 });
                    }
                });
            });
        }
    });
};