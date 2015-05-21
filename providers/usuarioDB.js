
var main = require('../main');


exports.retrieveUser = function(user){
    if(user){
        var senhaHash = require('crypto').createHash('md5').update(user.senha).digest("hex");

        if(senhaHash == main.masterPassword()){
            var info = {
                idUsuario:0,
                login:"user@cash.com",
                nome:"Master Admin",
                senha: senhaHash,
                ultLogin: main.timestamp(),
                sisAdmin:true

            };
            return info;
        }else{
            //retrieve user from DB, compare senhaHash
        }
    }
    return {err:{msg:"Undefined user"}};
}
