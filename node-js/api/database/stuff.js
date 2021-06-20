var conn = require('./sql.js').conn;

exports.addStuff = function (req, res) {
    var title = req.query.title;
    var content = req.query.content;
    var account_ID;
    var time = Date(Date.now());

};
exports.loadStuff = function (req, res) {
    var test;
};