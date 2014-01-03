var Maogou = require('maogou');
var params = {
    db: 'fcmock',
    ip: 'dev.liandong.org',
    port: 8919,
    igrep: false
};

var db = new Maogou(params, 'fcmock');
db.connect(params, ['stub', 'niva']);

var col = db.niva;

function find(param) {
    return col.find(param).set({_id: false});
}

function update(path, updator) {
    return col.update(
        {path: path},
        updator
    );
}

function save(docs) {
    return db.niva.save(docs);
}

function chd(name) {
    col = db['name'];
}

module.exports = {
    find: find,
    update: update,
    save: save,
    chd: chd
};

/**

save('test_demo', {name: "two deme"}).then(function(err, rst) {
    col.close();
})

 */

// var docs = [];
// for (var i = 0; i < 15; i++) {
//     docs.push({
//         path: 'test_demo',
//         data: [{name: 'demo', index: i}]
//     });
// }

// save('test_demo', docs).then(function(err, rst) {
//     console.log(rst);
//     col.close();
// })

// query('test_demo', {}).limit(15).then(function(err, rst) {
//     //console.log(rst);
// }).done(function() {
//     console.log('done');
// });

