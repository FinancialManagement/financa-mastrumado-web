/**
* Module dependencies.
*/

var express = require('express');
var session = require('express-session');
var routes = require('./routes');
var path = require('path');
var pg = require('pg');

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
app.use(express.favicon());
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

app.get('/', routes.index);
/*
app.get('/session',function(req, res){
  console.log('session='+req.session.id);
  res.send("Nada a fazer por aqui... foi mal");
});
app.get('/users', user.list);
app.get('/partidas', partidas.listar);
app.get('/registro', registro.main);
app.get('/db', db.execute);
app.get('/jogo', jogo.mesa);
app.get('/jogo/:id', jogo.mesa);
app.get('/logout', function(req, res){
  req.session.login = undefined;
  res.redirect('/');
});
app.get('/encerrarpartida', partidas.encerrar);
app.post('/', routes.index);
app.post('/partidas', partidas.listar);
app.post('/criarpartida', partidas.criar);
app.post('/encerrarpartida', partidas.encerrar);
app.post('/salvarRegistro', registro.salvar);
app.post('/login', routes.login);
app.post('/deletarRegistro', registro.deletar);
app.post('/registro', registro.main);
//*/
var io = require('socket.io').listen(app.listen(app.get('port'), function(){
                                        process.env.NODE_ENV = app.get('env');
                                        console.log("Running in "+ process.env.NODE_ENV +" mode");
                                        console.log("Listening on localhost:" + app.get('port'));
                                      }));

require('./exchange')(app, io);
