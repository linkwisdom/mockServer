module.exports = function(path, param) {
    var stub = module.stub;
    var path = module.path;
    var param = module.param;
    
    if (stub) {
        module.exports = module.stub;
    } else {
        module.exports = {
            name: "nikon_abstract",
            path: path
        };
    }
}
