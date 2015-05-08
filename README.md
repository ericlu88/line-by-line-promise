# line-by-line-promise

is a [NodeJS](http://nodejs.org/) module that reads large text files line by line, without buffering the files into memory. It is built upon [line-by-line](https://github.com/RustyMarvin/line-by-line) but returns [Promise](https://www.promisejs.org/) for every line read, enabling generator based flow-control.

Installation:

    npm install line-by-line-promise


## Usage:

```javascript
var lineReader = require('line-by-line-promise');
var file = new lineReader('big_file.txt');

// Example using co: https://github.com/tj/co
co(function* () {
    var line;
    while(line = yield file.readLine()) {
        console.log(line);
    }
});

// Example using bluebird: https://github.com/petkaantonov/bluebird
(Promise.coroutine(function* () {
    var line;
    while(line = yield file.readLine()) {
        console.log(line);
    }
}))();
```

## License:

The MIT License (MIT)

Copyright © 2014 Eric Lu