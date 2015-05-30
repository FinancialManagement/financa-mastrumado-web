/*
* GET home page.
*/
var usrCtrl = require('../controllers/usuariosCtrl');

exports.index = function(req, res){
  if(req.session.login){
    res.render('index', { title: 'Financial Management', login:req.session.login,userName:req.session.login.nome});
  }else{
    console.log('sem login');
    res.render('login', { title: 'Financial Management'});
  }
}
