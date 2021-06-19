import { conn } from 'sql.js';

exports.login = function (req, res) {

    var username_s = req.query.username;
    var password = req.query.password;

    var hash = password;

    var sql = "SELECT * FROM UserData WHERE username = '" + username_s + "' AND password = '" + password + "'";

    conn.query(sql, function (err, rows, fields) {
        if (err) res.status(404).json(null);
        else if (rows[0].username == username_s && rows[0].password == password) {
            req.session.username = username_s;
            req.session.password = password;
            res.status(200).json({ username: +"'" + username_s + "'" });
        }
        else if (rows[0].username == username_s && rows[0].password != password) res.status(406).json(null);
    });
};
exports.logout = function (req, res) {
    req.session.destory();
};