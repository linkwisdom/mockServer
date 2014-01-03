module.exports = function(path, param, stub) {
    if (stub) {
        stub.token = 1988;
        return stub;
    } else {
        return {
            name: "nikon_abstract-2",
            param: param,
            path: path,
            stub: stub
        };
    }
};