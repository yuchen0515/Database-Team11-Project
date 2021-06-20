var conn = require('./sql.js').conn;
var crypto = require('crypto');

exports.register = function (req, res) {
    var user = req.query.username;
    var password = req.query.password;
    var name = req.query.name;

    console.log("get username: " + user);
    console.log("get password: " + password);

    var hash = crypto.createHash('md5').update(password).digest('hex');
    var register = "INSERT INTO UserData (account_ID, password, name, preference) VALUES ('"
        + user + "','" + hash + "','" + name + "','');";

    conn.query(register, function (err, rows, fields) {
        if (err) {
            console.log("register failed");
            res.status(404).json({ status: 404 });
        }
        else {
            console.log("register success");
            res.status(200).json({ status: 200 });
        }
    })
};