var conn = require('./sql.js').conn;
var crypto = require('crypto');

exports.login = function (req, res) {

    var username = req.query.username;
    var password = req.query.password;

    console.log("get username: " + username);
    console.log("get password: " + password);

    var login = "SELECT * FROM UserData WHERE account_ID = '" + username + "'";
    var hash = crypto.createHash('md5').update(password).digest('hex');

    conn.query(login, function (err, rows, fields) {
        if (err) {
            console.log("err 404: login failed-unknown err");
            res.status(404).json({ status: 404 });
        }
        else if (!rows.length) {
            console.log("err 404: login failed no user-" + username);
            res.status(404).json({ status: 404 });
        }
        else if (rows[0].account_ID == username && rows[0].password == hash) {
            //req.session.account_ID = username;
            //req.session.password = password;
            console.log("ok 200: login successed");
            res.status(200).json({ username: username, status: 200 });
        }
        else if (rows[0].account_ID == username && rows[0].password != hash) {
            console.log("err 406: user-" + username + " wrong password");
            res.status(406).json({ status: 406 });
        }
    });
};
exports.logout = function (req, res) {
    console.log("ok 200: logout");
    res.status(200).json({ status: 200 });
    //req.session.destory();
};
