/**
 * 将js文件打包为前端AMD文件
 * 
 * @type {[type]}
 */

var fs = require('fs');
var path = require('path');

function toClientAMD(content) {
    return 'define(function(require, exports, module) {'
        + '\nreturn '
        + content || '{}'
        + '});'
}

function toProc(content) {
    return 'function(path, param, module) {'
        + content
        + '});'
}

function readFile(filePath) {
    var content = '';
    if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath);
    }
    return content;
}

module.exports = function(config, isStatic) {
    return function(req, res, next) {
        if (!req.query) {
            return;
        }

        var filePath = req.query.pathname;
        filePath = path.join(config.sourceDir, filePath);

        var content = readFile(filePath);
        content = toClientAMD(content);
        console.log(filePath);
        res.end(content);
    }
};