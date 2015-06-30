#!/usr/bin/env node

var replace = require('../lib/replace');
var global = require('../lib/global');
var execgit = require('../lib/execgit');
var pattern = require('../lib/pattern');
var utils = require('../lib/utils');

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
    utils.emptyDirectory(destPath, function(empty) {
        console.log(empty);
        if (empty) {
            generator(destPath);
        } else {
            utils.confirm('destination is not empty, continue? [y/N] ', function(ok) {
                if (ok) {
                    //process.stdin.destroy();
                    utils.deleteFolderRecursive(destPath);
		    console.log('delete folder success');
                    generator(destPath);
                } else {
                    console.error('aborting');
                    process.exit(1);
                }
            });
        }
    });
}


function generator(destPath) {
    fs.mkdir(destPath, function(err) {
        console.log('mkdir :' + destPath);
        if (err) {
            console.log(err);
        }
        execgit.cmdClone(destPath, argv.clone);
        pattern.getPattern(path.join(destPath, '/**/*')).then(pattern.setPattern).then(function(pdata) {
            replace(destPath, pdata);
        });
    });
}
