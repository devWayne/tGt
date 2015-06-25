var sys = require('sys');

var execSync = require('child_process').execSync,
    exec = require('child_process').exec;

var fs= require('fs'),
    path = require('path');

var utils = {

    cmd: function(str) {
        return execSync(str).toString();
    },

    cmdClone: function(repoPath,repoUrl) {
	console.log('clone:'+repoPath);
        process.stdout.write(utils.cmd("cd " + repoPath + " && sudo git clone " + repoUrl +" ."));

    },

    cmdPull: function(repoInfo) {
	console.log('pull:'+__dirname);
        var rootRepo = path.join(__dirname, '..', repoInfo.name);
        process.stdout.write(utils.cmd("cd " + rootRepo + " && sudo git pull"));
    }
}

module.exports = utils;

