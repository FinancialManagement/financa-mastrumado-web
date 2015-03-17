/*
* GET home page.
*/
var usrCtrl = require('../controllers/usuariosCtrl');

exports.index = function(req, res){
  console.log(usrCtrl.doLogin().msg);
  console.log(usrCtrl.doLogin({name:'teste'}).msg);
  if(req.session.login){
    console.log('com login');
  }else{
    console.log('sem login');
  }
  res.render('index', { title: 'Financial Management'});
}
