var fs = require('fs');
var _global = require('../global.json');


function G(key, name, value) {
    if (arguments.length == 2) {
        return _global[key][name] || ''

    } else if (arguments.length > 2) {
        _global[key][name] = value;
        fs.writeFile('global.json', JSON.stringify(_global), function(e) {
            if (e) {
                console.log(e);
            } else {
                console.log('success');
            }
        });
    }
}

function gVar(name, value) {
    if (arguments.length == 1) {
        return G("gvar", name);
    }
    else{
    	G("gvar",name,value);
    }
}

function gTpl(name, value) {
    if (arguments.length == 1) {
        return G("gtpl", name);
    }
    else{
    	G("gtpl",name,value);
    }
}

function deleteG() {

}

function getAllG() {
    return JSON.stringify(_global);
}

module.exports = {
    G: G,
    gVar: gVar,
    gTpl: gTpl,
    getAllG: getAllG,
    deleteG: deleteG
};
