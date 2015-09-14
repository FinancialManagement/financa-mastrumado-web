
var usrProv = require('../providers/usuarioDB');
var main = require('../main');

exports.doLogin = function(user,onReturn){
  if(user){
    var senhaHash = require('crypto').createHash('md5').update(user.senha).digest("hex");

    if(senhaHash == main.masterPassword()){
      onReturn({
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
      });
    }else{
      console.log("buscando no DB");
      user.senha = senhaHash;
      usrProv.retrieveUser(user,function(retUser){
        onReturn(retUser);
      });
    }
  } else{
    onReturn({success: false,msg:'Undefined user'});
  }
}

exports.listUsers = function(user,onReturn){
  usrProv.listUsers(function(retUser){
    onReturn(retUser);
  });
}
