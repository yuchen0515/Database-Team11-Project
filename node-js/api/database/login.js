var conn = require('./sql.js').conn;

exports.login = function (req, res) {

    var username = req.query.account_ID;
    var password = req.query.password;

    var sql = "SELECT * FROM UserData WHERE account_ID = '" + username + "'";

    conn.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(404).json(null);
            console.log("err 404");
        }
        else if (rows[0].account_ID == username && rows[0].password == password) {
            //req.session.user = username_s;
            //req.session.password = password;
            res.status(200).json({ name: +"'" + rows[0].account_ID + "'" });
        }
        else if (rows[0].account_ID == username && rows[0].password != password) {
            res.status(406).json(null);
            console.log("err 406");
        }
    });
};
exports.logout = function (req, res) {
    req.session.destory();
};