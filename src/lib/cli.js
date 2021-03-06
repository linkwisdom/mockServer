#!/usr/bin/env node

var ms = require('./index');
var cli = {};
exports.cli = cli;

cli.command = 'ms';
cli.options = ['id:', 'type:'];
cli.description = '运行mock服务';
cli.usage = 'edp ms <dir>';

cli.main = function ( args, opts ) {
    var cmd = args[0];
    console.log('start...');
    
    if (!cmd || cmd == 'start') {
        var port = +args[1];
        ms.start({port: port || 8811});
    } else if (cmd == 'stop') {
        ms.stop()
    }
};

//cli.main(process.args);