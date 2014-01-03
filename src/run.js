var fs = require('fs');
var path = require('path');

function getList(config) {

    var dir = path.join(config.sourceDir, '/stub');

    return function(req, res, next) {
        if (!fs.existsSync(dir)) {
            next();
            return;
        }

        var arr = [];
        fs.readdir(dir, function(err,files) {
            if(err) throw err;
            files.forEach(function(file){
                var pathname = path.basename(file, '.js');
                if (pathname.match(/\w+_\w+/g)) {
                    arr.push(pathname);
                }
            });
            res.end(JSON.stringify(arr) );
        });
    };
}

module.exports = {
    getList: getList
};

