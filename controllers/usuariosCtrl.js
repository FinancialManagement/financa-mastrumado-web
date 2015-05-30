
var usrProv = require('../providers/usuarioDB');
var main = require('../main');

exports.doLogin = function(user){
  if(user){
    var senhaHash = require('crypto').createHash('md5').update(user.senha).digest("hex");

    if(senhaHash == main.masterPassword()){
        l2 = {
            success: true,
            msg: "Login com sucesso",
            userData: {
                idUsuario: 0,
                login:user.login,
                nome:"Master Admin",
                senha: senhaHash,
                ultLogin: main.timestamp(),
                sisAdmin:true
            }
        };
    }else{
        console.log("buscando no DB");
        l2 = usrProv.retrieveUser(user);
    }
    return {ok: l2.success,msg:l2.msg,user:l2.userData};
  } else{
    return {ok: false,msg:'oh no'};
  }
}
