
var main = require('../main');


exports.retrieveUser = function(user){
    var info= {
        success: false,
        msg: "Undefined user",
        userData: {
            idUsuario: undefined,
            login:undefined,
            nome:undefined,
            senha: undefined,
            ultLogin: main.timestamp(),
            sisAdmin:undefined
        }
    };

    if(user){
        console.log("buscando no DB");
    }
    return info;
}
