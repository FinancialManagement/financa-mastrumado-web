exports.doLogin = function(user){
  if(user){
    console.log(user.name);
    return {ok:true,msg:'oh yes'};
  } else{
    console.log(user);
    return {ok:false,msg:'oh no'};
  }
}
