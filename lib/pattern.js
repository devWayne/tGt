var glob = require("glob");
var fs = require("fs");

function getPattern(pathList,cb) {
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
        //console.log(patternList);
        cb(unique(patternList));
    });
}

function checkExist(array, item) {
    array.forEach(function(v, idx) {
	if(v == item){
	return true;
	}
    });
    return false;
}

function remove(v, _array) {
    var index = _array.indexOf(v);
    if (index > -1) {
        _array.splice(index, 1);
    }
}

function unique(array){
	var res = [];
	var json = {};
	for(var i = 0; i < array.length; i++){
		if(!json[array[i]]){
			res.push(array[i]);
			json[array[i]] = 1;
		}
	}
	//console.log(res);
	return res;
}
//getPattern("./*/*");
module.exports = getPattern;
