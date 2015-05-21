/**
* Module dependencies.
*/

var express = require('express');
var session = require('express-session');
var routes = require('./routes');
var path = require('path');
var pg = require('pg');
var favicon = require('serve-favicon');
var moment = require('moment');

var server_port = process.env.PORT || 5000
//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
//global.conString = process.env.DATABASE_URL || 'postgres://sniugvsmhjrjoa:19OtuzbOYPLJYlJN2mcXR8p0CD@ec2-54-235-250-41.compute-1.amazonaws.com:5432/db1v390e3cajgv?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';
//process.env.HEROKU_POSTGRESQL_CHARCOAL_URL;
var app = express();

// all environments
app.set('port', server_port);
app.use(express.cookieParser());
app.use(session({
    secret: 'keyboard cat'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

console.log(moment().format('YYYY-MM-DD HH:mm:ss.SSS'));

app.get('/', routes.index);
app.get('/session',function(req, res){
    console.log('session='+req.session.id);
    res.send("Nada a fazer por aqui... foi mal");
});
app.post('/login', function(req,res){

    var usrCtrl = require('../controllers/usuariosCtrl');

    var user = usrCtrl.doLogin({login: req.body.email,senha: req.body.senha});

    if(user.ok){
        console.log(user.msg);
        console.log(user.user);
        req.session.login = user;
        res.send('{"msg": "Login com sucesso","ok":true}');
    }else{
        res.send('{"msg": "Email ou senha incorretos","ok":false}');
    }
});
app.get('/logout', function(req, res){
    req.session.login = undefined;
    res.redirect('/');
});
/*
app.get('/users', user.list);
app.get('/partidas', partidas.listar);
app.get('/registro', registro.main);
app.get('/db', db.execute);
app.get('/jogo', jogo.mesa);
app.get('/jogo/:id', jogo.mesa);
app.get('/encerrarpartida', partidas.encerrar);
app.post('/', routes.index);
app.post('/partidas', partidas.listar);
app.post('/criarpartida', partidas.criar);
app.post('/encerrarpartida', partidas.encerrar);
app.post('/salvarRegistro', registro.salvar);
app.post('/deletarRegistro', registro.deletar);
app.post('/registro', registro.main);
//*/

exports.masterPassword = function(){
    return 'dc5f452880fda8a6fc06e85e5f269c43';
}

exports.timestamp = function(){
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
}

var io = require('socket.io').listen(app.listen(app.get('port'), function(){
    process.env.NODE_ENV = app.get('env');
    console.log("Running in "+ process.env.NODE_ENV +" mode");
    console.log("Listening on localhost:" + app.get('port'));
}));

require('./exchange')(app, io);
