'use strict'

var path = require('path');
var co = require('co');
var lineReader = require('./index');

var file = new lineReader(path.resolve('./package.json'));
co(function* () {
    var line;
    while(line = yield file.readLine()) {
        console.log(line);
    }
}).catch(function (err) {
    console.log('Error: ' + err.message);
    return;
});
