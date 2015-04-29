
var usrProv = require('../providers/usuarioDB');

exports.doLogin = function(user){
  if(user){
    console.log(user.login);
    var l2 = usrProv.retrieveUser(user);
    return {ok:true,msg:'oh yes',user:l2};
  } else{
    console.log(user);
    return {ok:false,msg:'oh no'};
  }
}
