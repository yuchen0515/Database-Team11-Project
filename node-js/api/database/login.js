var conn = require('./sql.js').conn;

exports.login = function (req, res) {

    var username = req.query.username;
    var password = req.query.password;
    /*
        console.log("get username: " + username);
        console.log("get password: " + password);
    */
    var sql = "SELECT * FROM UserData WHERE account_ID = '" + username + "'";

    conn.query(sql, function (err, rows, fields) {
        if (!rows.length) {
            res.status(404).json({ status: 404 });
            console.log("err 404");
        }
        else if (rows[0].account_ID == username && rows[0].password == password) {
            //req.session.account_ID = username;
            //req.session.password = password;
            res.status(200).json({ username: username, status: 200 });
            console.log("correct 200");
        }
        else if (rows[0].account_ID == username && rows[0].password != password) {
            res.status(406).json({ status: 406 });
            console.log("err 406");
        }
    });
};
exports.logout = function (req, res) {
    console.log("logout");
    res.status(200).json(null);
    //req.session.destory();
};