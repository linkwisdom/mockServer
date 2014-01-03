var fs = require('fs');
var path = require('path');

function getList(dir) {
    var service = {};
    var files = fs.readdirSync(dir);
    files.forEach(function(file) {
        var pathname = path.basename(file, '.js');
        if (pathname.match(/\w+_\w+/g)) {
            service[pathname] = require(pathname);
        }
    });
    return service;
}

var serice = getList(__dirname);
module.exports = service;

