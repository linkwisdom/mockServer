exports.port = 8834;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

exports.getLocations = function () {
    return [
        {
            location: '/',
            handler: home( 'index.html' )
        },
        {
           location: /\/request.ajax/,
           handler: proxy('localhost', 8811)
        },
        {
            location: /^\/mock/,
            handler: proxy('localhost', 8811),
        }
    ];
};

exports.injectResource = function ( res ) {
    for ( var key in res ) {
        global[ key ] = res[ key ];
    }
};