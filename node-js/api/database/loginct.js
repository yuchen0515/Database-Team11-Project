exports.login_get = function (req, res) {
    console.log("get");
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("login test");
    res.end();
};