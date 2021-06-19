var mysql = require('mysql');

var fs = require('fs')
var ini = require('ini')

var config = ini.parse(fs.readFileSync('./conf.ini', 'utf-8'));

//console.log(config.server.host, config.server.user, config.server.password, config.server.port);

var con = mysql.createConnection({
    host: config.server.host,
    user: config.server.user,
    password: config.server.password,
    port: config.server.port,
});



con.connect(function (err) {
    //if (err) throw err;
    console.log("connect success!")
});

con.end(function (err) {
    //if (err) throw err;
    console.log('connect end');
})
