#!/usr/bin/env node

var inject = require('../lib/inject');
var global = require('../lib/global');
var git = require('../lib/git');
var pattern = require('../lib/pattern');
var log = require('nl-clilog');
var readline = require('readline');

var path = require('path');
var fs = require('fs');

var argv = require("minimist")(process.argv.slice(2), {
    alias: {
        'dir': 'd',
        'global': 'g',
        'clone': 'c'
    },
    'default': {
        'dir': process.cwd()
    }
});

console.log(argv);
if (argv.help) {
    console.log("Usage:");
    console.log("  tGt --help // print help information");
    console.log("  tGt //");
    console.log("  ");
    process.exit(0);
}

if (argv.global && argv._.length > 0) {
    //console.log(argv);
    global.G(argv.global, argv._[0]);
}

if (argv.clone) {
    var cloneName = argv.clone.match(/\/([\w-]+).git$/i)[1];
    var destPath = path.join(argv.dir, cloneName);
    console.log(destPath)
    emptyDirectory(destPath, function(empty) {
        console.log(empty);
        if (empty) {
            fs.mkdir(destPath, function(err) {
                console.log('mkdir :' + destPath);
                if (err) {
                    console.log(err);
                }
                git.cmdClone(destPath, argv.clone);
		pattern.getPattern(path.join(destPath, '/**/*')).then(pattern.setPattern).then(function(pdata) {
                    inject(destPath, pdata);
                });
            })
        } else {
            confirm('destination is not empty, continue? [y/N] ', function(ok) {
                if (ok) {
                    process.stdin.destroy();
                    createApplication(appName, destinationPath);
                } else {
                    console.error('aborting');
                    process.exit(1);
                }
            });
        }
    });
}


function emptyDirectory(path, fn) {
    fs.readdir(path, function(err, files) {
        if (err && 'ENOENT' != err.code) throw err;
        fn(!files || !files.length);
    });
}


function confirm(msg, callback) {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(msg, function(input) {
        rl.close();
        callback(/^y|yes|ok|true$/i.test(input));
    });
}


