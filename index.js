'use strict'
var lineReader = require('line-by-line');

var LineReader = function (filepath, options) {
    var self = this;
    if (1 === arguments.length) {
        options = {};
    }
    options.skipEmptyLines = true;  // Have to set this to be true all the time
    this._file = new lineReader(filepath, options);
    this._file.pause();
};

LineReader.prototype.readLine = function () {
    var self = this;
    this._file.resume();
    return new Promise(function (resolve, reject) {
        self._file.once('line', function (line) {
            resolve(line);
            self._file.pause();
            self._file.removeAllListeners();
        });
        self._file.once('end', function () {
            resolve();
            self._file.removeAllListeners();
        });
        self._file.once('error', function (err) {
            reject(err);
            self._file.removeAllListeners();
        });
    });;
}

module.exports = LineReader;
