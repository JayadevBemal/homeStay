
exports.getLogin = (req,res,next) => {
  res.render('auth/login',{pageTitle:'Login Page',editing:false,
    isLoggedIn: false
  })
}

exports.postLogin = (req,res,nex) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
}

exports.postLogout = (req,res,next) =>{
  req.session.destroy(() => res.redirect("/"));
  
}