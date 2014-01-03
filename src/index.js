/**
 * mockServer的主要作用就是运行本地的mock数据
 *
 * 本地mock数据使用 module.exports 方式暴露数据
 * 
 */

var path = require('path');
var http = require('http');
var connect = require('connect');

var getMockList = require('./getMockList');
var mockService = require('./mockService');
var debugLoad = require('./debugLoad');

var db = require('./db');

// 配置
var config = {
    sourceDir: __dirname + '/../demo/',
    staticDir: __dirname + '/../demo/'
};

exports.config = config;

exports.start = function(param) {
    var app = connect();

    // 事先处理好post数据
    app.use('/', function(req, res, next) {
        req.query = require('url').parse(req.url, true);
        next();
    });

    app.use('/debug', connect.query());
    app.use('/request.ajax', connect.query());

    app.use(connect.logger('dev'));

    // 事先处理好post数据
    app.use('/request.ajax', connect.bodyParser());

    // validation
    // app.use('/request.ajax', mockService.validate(config));

    // service
    app.use('/request.ajax', mockService.serve(config));

    // wrapper
    app.use('/request.ajax', function(req, res, next) {
        // 在这里对结果进行封装
    });

    // 打包前端文件
    app.use('/mock', debugLoad(config));
    
    // 列表服务请求
    //app.use('/GET_mock_list.json', getMockList(config));

    // 处理静态文件
    app.use('/favicon.ico', connect.static('./index.js'));
    app.use('/', connect.static(config.staticDir));

    // 开始监听请求
    app.listen(param.port || '8787');

    // 启动标识
    console.log('server started');

    // 即使出现异常，最好也别退出服务
    process.on('uncaughtException', function(err) {
        console.error(err);
    });
};

//exports.start({port: 8811});