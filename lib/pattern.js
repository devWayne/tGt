var glob = require("glob");
var fs = require("fs");
var path = require('path');

var readline = require('readline');
function getPattern(pathList) {
    return new Promise(function(resolve, reject) {
        var patternList = [];
        glob(pathList, {
            mark: true,
            nodir: true
        }, function(er, matches) {
            console.log(matches);
            matches.forEach(function(match, idx) {
                if ((/node_modules/.test(match))) return;
                console.log(match);
                var files = fs.readFileSync(match, "utf-8");
                var _pL = files.match(/{{\w+}}/g);
                if (_pL != null && _pL != [] && _pL != undefined) {
                    patternList = patternList.concat(_pL);
                }
            });
            resolve(unique(patternList));
        });
    });
}

function setPattern(patternList) {
    return new Promise(function(resolve, reject) {
        console.log(patternList);
        var patternData = {};
	console.log('patternList:'+patternList.length);
        if (patternList.length == 0) process.exit(1);
        read('input ' + (function(_array) {
            var str = '';
            _array.forEach(function(v, idx) {
                str = str + v + ' ';
            });
            return str;
        })(patternList) + ' :', function(readVal) {
            var readValList = readVal.split(' ');
            patternList.forEach(function(v, idx) {
                patternData[v] = readValList[idx];
            });
            console.log(patternData);
            resolve(patternData);
        });
    });
}

function unique(array) {
    var res = [];
    var json = {};
    for (var i = 0; i < array.length; i++) {
        if (!json[array[i]]) {
            res.push(array[i]);
            json[array[i]] = 1;
        }
    }
    return res;
}

function read(msg, callback) {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(msg, function(input) {
        rl.close();
        callback(input);
    });
}
module.exports = {
    getPattern: getPattern,
    setPattern: setPattern
};
