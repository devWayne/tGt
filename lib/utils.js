var readline = require('readline');
var fs = require('fs');
var glob = require("glob");

var utils = {

    emptyDirectory: function(path, fn) {
        fs.readdir(path, function(err, files) {
            if (err && 'ENOENT' != err.code) throw err;
            fn(!files || !files.length);
        });
    },

    deleteFolderRecursive: function(path) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function(file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    utils.deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    },


    confirm: function(msg, callback) {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(msg, function(input) {
            rl.close();
            callback(/^y|yes|ok|true$/i.test(input));
        });
    },

    read: function(msg, callback) {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(msg, function(input) {
            rl.close();
            callback(input);
        });
    }
}

module.exports = utils;
