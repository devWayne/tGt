var fs = require('fs');
var _global = require('../global.json');


function G(name, value) {

    if (arguments.length == 1) {
        return _global[name] || ''

    } else {
        _global[name] = value;
        //console.log(JSON.stringify(_global));
        fs.writeFile('./global.json',JSON.stringify(_global), function(e) {
            if (e) {
                console.log(e);
            }
	    else{
	    	console.log('success');
	    }
        });

    }
}

function getAllG() {
    return JSON.stringify(_global);
}

//getAllG();
//console.log(_global);
module.exports = {
    G: G,
    getAllG: getAllG
};
