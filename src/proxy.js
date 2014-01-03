var httpProxy = require('http-proxy');
var http = require('http');

http.createServer(function(request, response) {
    var proxyConfig = {
        host: 'fctest.baidu.com',
        port: 8000
    };

    proxy.proxyRequest(request, response, proxyConfig);
}).listen(8000);