
var main = require('../main')
var myDB = require('./myDB')

exports.getLogin = function(user,onReturn){
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
    }
    if(user){
        var db = myDB.newConnection()
        db.query("SELECT * FROM USUARIOS WHERE login =$1 and senha=$2", [user.login,user.senha])
        .then(function (data) {
            if(data.length>0){
              info.success= true
              info.msg= "Login successful"
              info.userData = data
            }else{
              info.msg= "Invalid login"
            }
            onReturn(info)
        })
        .catch(function (reason) {
            console.log('reason',reason) // print error
            onReturn(info,reason.message)
        })
    }else{
      onReturn(info)
    }
}

exports.listUsers = function (onReturn) {
    var db = myDB.newConnection()
    db.query("SELECT * FROM USUARIOS")
    .then(function (data) {
        onReturn(data)
    })
    .catch(function (reason) {
        onReturn(undefined,reason.message)
    })
}

exports.getUser = function(userID,onReturn){
    var db = myDB.newConnection()
    db.query("SELECT * FROM USUARIOS WHERE idusuario =$1", userID)
    .then(function (data) {
        console.log('data.length',data.length);
        if(data.length>0){
            onReturn(data[0])
        }else{
            onReturn(undefined,'User not found')
        }
    })
    .catch(function (reason) {
        onReturn(undefined,reason.message)
    })
}
