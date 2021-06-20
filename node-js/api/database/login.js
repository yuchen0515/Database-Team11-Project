var conn = require('./sql.js').conn;
var crypto = require('crypto');

exports.login = function (req, res) {

    var username = req.query.username;
    var password = req.query.password;
    /*
        console.log("get username: " + username);
        console.log("get password: " + password);
    */
    var sql = "SELECT * FROM UserData WHERE account_ID = '" + username + "'";
    var hash = crypto.createHash('md5').update(password).digest('hex');

    conn.query(sql, function (err, rows, fields) {
        //res.header("Access-Control-Allow-Origin", "*");
        //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (!rows.length) {
            console.log("err 404");
            res.status(404).json({ status: 404 });
        }
        else if (rows[0].account_ID == username && rows[0].password == hash) {
            //req.session.account_ID = username;
            //req.session.password = password;
            console.log("correct 200");
            res.status(200).json({ username: username, status: 200 });
        }
        else if (rows[0].account_ID == username && rows[0].password != hash) {
            console.log("err 406");
            res.status(406).json({ status: 406 });
        }
    });
};
exports.logout = function (req, res) {
    console.log("logout");
    res.status(200).json(null);
    //req.session.destory();
};
