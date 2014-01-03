/**
 * mock 读取mock文件；并且使用runjs执行改文件
 * 
 * @type {[type]}
 */
var vm = require('vm');
var fs = require('fs');
var url = require('url');
var path = require('path');
var querystring = require('querystring');

var config = {

};

function getStub(path, param) {
    console.log(path);
    return {
        status: 210,
        path: path,
        data: []
    };
}

/**
 * 执行代码
 * 
 * @param  {[type]} code  [description]
 * @param  {[type]} path  [description]
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
function runJS(code, path, param) {
    var stub = getStub(path, param);

    var module = {
        exports: false
    };

    module.module = module;

    try {
        if (code) {
            vm.runInNewContext(code, module);
            var caller = module.exports;
            if ('function' == typeof caller) {
                module.exports = caller(path, param, stub);
            }
        }
    } catch (ex) {
        module.status = 500;
    } finally {
        var rst = module.exports;
        if (!rst.status && !rst.data) {
            return {
                status: module.status,
                data: rst
            }
        } else {
            return rst;
        }
    }
};

/**
 * 通过pathname获得mock内容
 * 
 * @param  {[type]} pathname [description]
 * @return {[type]}          [description]
 */
function getMockContent(pathname) {
    var parts = /(GET|MOD|DEL)\/(\w+)\/(\w+)/g.exec(fileName);
    var fileName = pathname + '.js';
    var modpath = '/mock/';
    if (parts.length >= 4) {
        fileName = '/mock/' + parts[2]
    } else {
        fileName
    }

    var filePath = path.join(config.sourceDir, '/mock/nikon/', fileName);

    var content = readFile(filePath);
}

/**
 * 获得ajax-mock请求数据
 * 
 */
function getMockResult(pathname, param) {
    if ('string' == typeof param) {
        try {
            param = JSON.parse(param);
        } catch(ex) {}
    }

    var conten = getMockContent(pathname);
    pathname = pathname.replace(/\//g, '_');
    var data = {};

    if (content) {
        data = runJS(content, pathname, param);
    }

    return data;
};

// 读取文件
function readFile(filePath) {
    var content = '';
    if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath);
    }
    return content;
}

// 验证请求
function validate(req, res, next) {

    var param = req.query.param
        || req.query.body.param;

    // 必须含有path和param参数
    if (req.query.path && param) {
        next();
    } else {
        res.end({
            msg: 'Bad Request: parameters error',
            status: 400
        });
    }
};

/** 
 * mock服务， 依赖请求获得参数
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
function mockService(request, response) {
    var query = url.parse(request.url, true).query;
    var result = {};
    var delaySpan = 500;
    var path = query.path;
    var param = query.param;

    var timer = setTimeout(function() {
        response.end(JSON.stringify(result));
    }, delaySpan);

    if (request.method == 'POST') {
        var param = request.body.param;
        result = getMockResult(path, param);
    } else if (path && param) {
        result = getMockResult(path, param);

        // db.find({path: path}).then(function(err, rst) {
        //     result = err || rst;
        //     return rst;
        // }).then(function(err, rst) {
        //     result = {
        //         status: 200,
        //         data: rst
        //     };
        // });
    }
}

exports.serve = function(cnf) {
    config = cnf;
    return mockService;
};

exports.validate = function(cnf) {
    config = cnf;
    return validate;
};