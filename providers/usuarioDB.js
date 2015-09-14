
var main = require('../main');
// Loading and initializing the library:
var pgp = require('pg-promise')(/*options*/);

exports.retrieveUser = function(user,onReturn){
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
        var db = pgp(global.conString);
        db.query("SELECT * FROM USUARIOS WHERE login =$1 and senha=$2", [user.login,user.senha])
        .then(function (data) {
            if(data.length>0){
              info.success= true;
              info.msg= "Login successful";
              info.userData = data;
            }else{
              info.msg= "Invalid login";
            }
            onReturn(info);
        }, function (reason) {
            console.log(reason); // print error;
        });
    }else{
      onReturn(info);
    }
}

exports.listUsers = function (onReturn) {
    var db = pgp(global.conString);
    db.query("SELECT * FROM USUARIOS")
    .then(function (data) {
        onReturn(data);
    }, function (reason) {
        console.log(reason); // print error;
    });
};
