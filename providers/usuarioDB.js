
var main = require('../main');
var pg = require('pg');

exports.retrieveUser = function(user){
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
        console.log("buscando no DB");
        var sql = "SELECT * FROM USUARIOS WHERE login = '"+user.login;

        pg.connect(global.conString, function(err, client, done){
            if(err){
                info.msg = "Connection error: "+err;
            }else{
                client.query(sql, function(err, result) {
                    if(result.rows.length==1){
                        /*
                        for(var row in result.rows){
                            req.session.login={
                                nome:result.rows[row].nome,
                                email:result.rows[row].email
                            };
                        }//*/
                        info.success= true;
                        info.msg= "Login successful";
                        info.userData.idUsuario= result.rows[0].idUsuario;
                        info.userData.login= result.rows[0].login;
                        info.userData.nome= result.rows[0].nome;
                        info.userData.senha= result.rows[0].senha;
                        //info.userData.ultLogin= main.timestamp();
                        info.userData.ultLogin= main.timestamp();
                        info.userData.sisAdmin= result.rows[0].sisAdmin;
                    }else{
                        info.msg = "Invalid login information.";
                    }
                });
            }
        });
    }
    return info;
}

exports.listUsers = function (request, response) {
  pg.connect(global.conString, function(err, client, done){
    if(err){
      console.log('error: ', err);
      response.send('{"titulo": "Erro conectando: ","erro": "'+err+'"}');
    }else{
      client.query("SELECT * FROM usuarios", function(err, result) {
        console.log("Row count: %d",result.rows.length);  // n
        var usuarios=[];
        for(var row in result.rows){
          usuarios.push({
            nome:result.rows[row].nome,
            email:result.rows[row].email
          });
        }
        response.render('users', { title: 'Lista de usuarios',usuarios: usuarios });
      });
    }
  });
};
