'use strict';

var LineReaderImpl = require('line-by-line');

function LineReader(/* arguments */) {
    // forward the the arguments to the underlying implementation
    this._file = (function(args) {
        function F(args) {
            return LineReaderImpl.apply(this, args);
        }
        F.prototype = LineReaderImpl.prototype;
        return new F(args);
    })(arguments);
    this._file.pause();
}

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
            resolve(null);
            self._file.removeAllListeners();
        });
        self._file.once('error', function (err) {
            reject(err);
            self._file.removeAllListeners();
        });
    });
};

module.exports = LineReader;
