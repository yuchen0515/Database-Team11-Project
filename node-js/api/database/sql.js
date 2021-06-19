var mysql = require('mysql');

var fs = require('fs')
var ini = require('ini')

var config = ini.parse(fs.readFileSync('./conf.ini', 'utf-8'));

var conn = mysql.createConnection({
    host: config.server.host,
    user: config.server.user,
    password: config.server.password,
    port: config.server.port,
    //database: 'team11',
});



conn.connect(function (err) {
    if (err) throw err;
    console.log("connect success!")
});
conn.query('SELECT 12 + 34 AS result', function (err, rows, fields) {
    if (err) throw err;
    console.log('The result is: ', rows[0].result);
});
conn.end(function (err) {
    //if (err) throw err;
    console.log('connect end');
})
