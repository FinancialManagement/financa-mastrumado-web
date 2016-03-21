
var main = require('../main')
var myDB = require('./myDB')

exports.getLogin = function(user,onReturn){
    var info= {
        success: false,
        msg: "Undefined user"
    }
    var db = myDB.newConnection()
    db.tx(function(t) {
        // t = this;
        return t.one("SELECT idusuario,login,nome,senha,ultlogin,sisadmin FROM USUARIOS WHERE login =$1 and senha=$2", [user.login,user.senha])
            .then(function (data) {
                t.any("update usuarios set ultLogin=current_timestamp where idUsuario=$1", data.idusuario);
                return data;
            }).catch(function(){return undefined})
    })
    .then(function (data) {
        if(data){
          info.success= true
          info.msg= "Login successful"
          info.userData = data
        }else{
          info.msg= "Invalid login"
        }
        onReturn(info)
    })
    .catch(function (reason) {
        console.log('catch-reason',reason) // print error
        onReturn(info,reason.message)
    })
}

exports.listUsers = function (onReturn) {
    var db = myDB.newConnection()
    db.query("SELECT idusuario,login,nome,sisadmin,ultlogin FROM USUARIOS ORDER BY idusuario")
    .then(function (data) {
        onReturn(data)
    })
    .catch(function (reason) {
        onReturn(undefined,reason.message)
    })
}

exports.getUser = function(userID,onReturn){
    var db = myDB.newConnection()
    db.query("SELECT idusuario,login,nome,ultlogin,sisadmin FROM USUARIOS WHERE idusuario =$1", userID)
    .then(function (data) {
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

exports.saveUser = function(userData,onReturn){
    var sqlCommand = "INSERT INTO usuarios(login, nome, senha, sisadmin) VALUES ('${login^}', '${nome^}', 'e10adc3949ba59abbe56e057f20f883e', ${sisadmin^});"
    if(userData.idusuario)
        sqlCommand = "UPDATE usuarios SET login='${login^}', nome='${nome^}' WHERE idusuario = ${idusuario^};"
    var db = myDB.newConnection()
    db.none(sqlCommand, userData)
    .then(function (data) {
        onReturn('Saved successful',true)
    })
    .catch(function (reason) {
        //console.log('error:'+reason)
        onReturn(reason.message.replace(/"/g,'\\"'),false)
    })
}

exports.deleteUser = function(userID,onReturn){
    console.log('deleteing on DB');
    var sqlCommand = "DELETE FROM usuarios WHERE idusuario = ${idusuario^};"
    var db = myDB.newConnection()
    db.result(sqlCommand, {idusuario: userID})
    .then(function (result) {
        onReturn('Deleted successful',true)
    })
    .catch(function (reason) {
        //console.log('error:'+reason)
        onReturn(reason.message.replace(/"/g,'\\"'),false)
    })
}
