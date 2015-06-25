var replace = require("replace");

var global = require("./global");

function inject(_path,rpObj) {
    _path = _path.toString();
    for (var key in rpObj) {
        replace({
            regex: key,
            replacement: rpObj[key],
            paths: [_path],
            recursive: true,
            silent: true,
        });
    }

    for (var key in global){
         replace({
            regex: key,
            replacement: global[key],
            paths: [_path],
            recursive: true,
            silent: true,
        });   	
    }
}


module.exports = inject;
