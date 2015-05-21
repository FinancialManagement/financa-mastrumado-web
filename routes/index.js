/*
* GET home page.
*/
var usrCtrl = require('../controllers/usuariosCtrl');

exports.index = function(req, res){
  var l1 = usrCtrl.doLogin();
  if(l1.ok){
    console.log(l1.msg);
  }
  var l2 = usrCtrl.doLogin({login:'user@cash.com',senha:'senh@'});
  if(l2.ok){
    console.log(l2.msg);
    console.log(l2.user);
  }
  if(req.session.login){
    console.log('com login');
    res.render('index', { title: 'Financial Management'});
  }else{
    console.log('sem login');
    res.render('login', { title: 'Financial Management'});
  }
}
