var fs = require('fs');
var path = require('path');

function getList(dir) {
    var service = {};
    var files = fs.readdirSync(dir);
    files.forEach(function(file) {
        var pathname = path.basename(file, '.json');
        if (pathname.match(/\w+_\w+/g)) {
            service[pathname] = require( __dirname + '/' + pathname);
        }
    });
    return service;
}

var service = getList(__dirname);
module.exports = service;