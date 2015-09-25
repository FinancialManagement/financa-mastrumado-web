
var usrProv = require('../providers/usuarioDB')
var main = require('../main')
var crypto = require('crypto')

function hashPass(pass){
    return crypto.createHash('md5').update(pass).digest("hex")
}

exports.doLogin = function(user,onReturn){
    var senhaHash = hashPass(user.senha)

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
        })
    }else{
        user.senha = senhaHash
        usrProv.getLogin(user,function(retUser){
            onReturn(retUser)
        })
    }
}

exports.listUsers = function(onReturn){
    usrProv.listUsers(function(usersList,error){
        var message = undefined
        if(error) message = {type:'danger',title:'Error',msg:error}
        onReturn(usersList,message)
    })
}

exports.getUser = function(userID,onReturn){
    usrProv.getUser(userID,function(retUser,error){
        var message = undefined
        if(error) message = {type:'danger',title:'Error',msg:error}
        onReturn(retUser,message)
    })
}

exports.saveUser = function(userData,onReturn){
    var valid = true
    var msg
    console.log('sisadmin',userData.sisadmin);
    if(!userData.sisadmin){
        userData.senha =hashPass(userData.senha)
    }
    if (userData.senha && userData.sisadmin === true && userData.idusuario !== undefined) {
        valid = false
        msg = "Can't change the password of a System Admin"
    }
    if (valid)
        usrProv.saveUser(userData,onReturn)
    else
        onReturn(msg,valid)
}
