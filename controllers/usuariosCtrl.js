
var usrProv = require('../providers/usuarioDB');
var main = require('../main');

exports.doLogin = function(user){
  if(user){
    var senhaHash = require('crypto').createHash('md5').update(user.senha).digest("hex");

    var retUser=undefined;

    if(senhaHash == main.masterPassword()){
        retUser = {
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
        retUser = usrProv.retrieveUser(user);
    }
    /*
    console.log("buscando no DB");
    var retUser = usrProv.retrieveUser(user);

    if(senhaHash == main.masterPassword()){
        retUser.userData.idUsuario= 0;
    }else if(retUser.userData.senha != senhaHash){

    }
    //*/
    return {ok: retUser.success,msg:retUser.msg,user:retUser.userData};
  } else{
    return {ok: false,msg:'Undefined user'};
  }
}
