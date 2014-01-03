var config = require('mock/config');
var Quator = Requester;
var context = {};

exports.send = function(path, param, callback, failureCallback) {
    // 如果支持服务端
    if (path in config.remote) {
        // 发送到服务端请求
        Quator.send(path, level, param, callback, failureCallback);
        return true;
    }

    // 如果支持新的前端mock
    if (path in config.client) {
        var target = 'mock/' + path;
        require([target], function(response) {
            var module = {};
            var rst = null;
            if ('function' == typeof response) {
                rst = response(path, param, module);
                rst = rst || module.exports;
            } else {
                rst = response;
            }
            callback && callback(rst);
        });
        return;
    }
    // 采用老的mock处理方式
    if (window.Requester) {
        window.Requester.send(path, level, param, successCallback, failureCallback);
    }
};