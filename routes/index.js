/*
* GET home page.
*/
var usrCtrl = require('../controllers/usuariosCtrl');

function checkLogin(req,res,cb){
  if(req.session.login){
    cb(req,res);
  }else{
    console.log('sem login');
    res.render('login', { title: 'Financial Management'});
  }
}
exports.index = function(req, res){
  checkLogin(req,res,function(){
    res.render('index', { title: 'Financial Management', login:req.session.login,userName:req.session.login.nome,active:'home'});
  })
}

exports.about = function (req,res) {
  checkLogin(req,res,function(){
    res.render('about', {login:req.session.login,active:'about'});
  })
}

exports.contact = function (req,res) {
  checkLogin(req,res,function(){
    res.render('contact', {login:req.session.login,active:'contact'});
  })
}

exports.session = function(req, res){
  checkLogin(req,res,function(){
    console.log('session='+req.session.id);
    console.log('login=',req.session.login);
    res.send("Nada a fazer por aqui... foi mal");
  })
}

exports.login = function(req,res){
  usrCtrl.doLogin({login: req.body.email,senha: req.body.senha},function(ret){
    if(ret.success){
      req.session.login = ret.userData;
    }
    res.send('{"msg": "' + ret.msg + '","ok":' + ret.success + '}');
  });
}

exports.logout =function(req, res){
  req.session.login = undefined;
  res.redirect('/');
}

exports.users = function (req,res) {
  checkLogin(req,res,function(){
    if(req.method=="GET"){
      usrCtrl.listUsers({login: req.session.login},function(userList){
        res.render('users', {login:req.session.login,userList:userList,active:'users',mode:'list'});
      });
    }else {
      var mode= 'insert';
      if(req.body.mode)
        mode = req.body.mode;
      if(mode=='insert'){
        res.render('users', {login:req.session.login,active:'users',mode:mode});
      }else{
        usrCtrl.getUser(req.body.userID,function(user){
          res.render('users', {login:req.session.login,active:'users',mode:mode,user:user});
        });
      }
    }
  })
}
