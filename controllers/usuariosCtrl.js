
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
      user.senha = senhaHash;
      usrProv.getLogin(user,function(retUser){
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

exports.getUser = function(userID,onReturn){
  usrProv.getUser(userID,function(retUser){
    onReturn(retUser);
  });
}
