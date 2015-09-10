/*
* GET home page.
*/
var usrCtrl = require('../controllers/usuariosCtrl');

exports.index = function(req, res){
  if(req.session.login){
    res.render('index', { title: 'Financial Management', login:req.session.login,userName:req.session.login.nome,active:'home'});
  }else{
    console.log('sem login');
    res.render('login', { title: 'Financial Management'});
  }
}

exports.about = function (req,res) {
  if(req.session.login){
    res.render('about', {login:req.session.login,active:'about'});
  }else{
    res.render('login', { title: 'Financial Management'});
  }
}

exports.contact = function (req,res) {
  if(req.session.login){
    res.render('contact', {login:req.session.login,active:'contact'});
  }else{
    res.render('login', { title: 'Financial Management'});
  }
}

exports.session = function(req, res){
  if(req.session.login){
    console.log('session='+req.session.id);
    res.send("Nada a fazer por aqui... foi mal");
  }else{
    res.render('login', { title: 'Financial Management'});
  }
}

exports.login = function(req,res){
  var ret = usrCtrl.doLogin({login: req.body.email,senha: req.body.senha});

  if(ret.ok){
    req.session.login = ret.user;
  }

  res.send('{"msg": "' + ret.msg + '","ok":' + ret.ok + '}');
}

exports.logout =function(req, res){
  req.session.login = undefined;
  res.redirect('/');
}

exports.users = function (req,res) {
  if(req.session.login){
    var userList = [{name:'teste',email:'teste@a.b.c'},{name:'master',email:'master@a.b.c'}];
    res.render('users', {login:req.session.login,userList:userList,active:'users'});
  }else{
    res.render('login', { title: 'Financial Management'});
  }
}

exports.groups = function (req,res) {
  if(req.session.login){
    var groupList = [{name:'teste',active:true},{name:'master',active:true}];
    res.render('groups', {login:req.session.login,groupList:groupList});
  }else{
    res.render('login', { title: 'Financial Management'});
  }
}

exports.groupsUsers = function (req,res) {
  if(req.session.login){
    res.render('groupsUsers', {login:req.session.login});
  }else{
    res.render('login', { title: 'Financial Management'});
  }
}
