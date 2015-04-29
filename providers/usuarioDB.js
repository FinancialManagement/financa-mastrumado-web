
exports.retrieveUser = function(user){
    if(user){
        var senhaHash = require('crypto').createHash('md5').update(user.senha).digest("hex");
        
        if(user.login == "user@cash.com"){
            var info = {
                idUsuario:0,
                login:"user@cash.com",
                nome:"Master Admin",
                senha:"32 md5 pass",
                ultLogin:"2015-04-29 18:00:00.000",
                sisAdmin:true
            };
            return info;
        }
    }
    return {err:{msg:"Undefined user"}};
}
