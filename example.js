'use strict';

var path = require('path');
var Bluebird = require('bluebird');

var LineReader = require('./index');

var file = new LineReader(path.resolve('./package.json'));
Bluebird.coroutine(function* () {
    var line;
    // note that eof is defined when `readLine()` yields `null`
    while((line = yield file.readLine()) !== null) {
        console.log(line);
    }
})().catch(function(err) {
    console.log('Error: ' + err.message);
    return;
});
