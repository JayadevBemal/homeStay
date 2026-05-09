const { check, validationResult } = require("express-validator");

const bcrypt = require('bcryptjs')
const User = require("../models/user");

exports.getLogin = (req,res,next) => {
  res.render('auth/login',{pageTitle:'Login Page',editing:false,
    isLoggedIn: false,
    errors:[],
    oldInput:{},
    user: {}
  })
}

exports.postLogin = async (req,res,nex) => {

  const {email,password} = req.body;

  const user = await User.findOne({email});

  if(!user){
    return res.status(422).render("auth/login",{
      pageTitle: "Log In",
      isLoggedIn: false,
      errors:['User does not exist'],
      oldInput: {email}
    })

  }

  const isMatch = await bcrypt.compare(password,user.password)
  if(!isMatch){
   return res.status(422).render('auth/login',{
    pageTitle: "Log In",
      isLoggedIn: false,
      errors:['password is invalid'],
      oldInput: {}
   })
  }else{

    const userObj = user.toObject();
    userObj._id = user._id.toString()
    req.session.isLoggedIn = true;
    req.session.user = userObj;
    req.session.save((err) => {
    if (err) {
        console.error("Session save error:", err);
        return res.status(500).send("Server Error");
    }
    res.redirect("/")
});
  }
  
}

exports.postLogout = (req,res,next) =>{
  req.session.destroy(() => res.redirect("/"));
  
}

exports.getSignup = (req,res,next) => {
  res.render("auth/signup",{pageTitle: 'Sign Up',isLoggedIn: false,errors:[],oldInput:{},user:{}})
}

exports.postSignup = [
  
  check('firstname')
  .trim()
  .isLength({min: 3})
  .withMessage("first name should be more than 3 characters.")
  .matches(/^[a-zA-Z\s]+$/)
  .withMessage("first name can only contail letters."),
  
  check('lastname')
  .matches(/^[a-zA-Z\s]*$/)
  .withMessage("last name should contain only alphabets"),

  check('email')
  .isEmail()
  .withMessage("Please enter a valid email")
  .normalizeEmail(),

  check('password')
  .isLength({min: 4})
  .withMessage("at least 4 characters")
  .matches(/^[A-Z]/)
  .withMessage("at least one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("at least one lowercase letter")
  .matches(/[0-9]/)
  .withMessage("at least one number")
  .matches(/[!@]/)
  .withMessage("at least one special character"),

  check('ConfirmPassword')
  .trim()
  .custom((value,{req}) => {
    if(value !== req.body.password){
      throw new Error("password did not match");
    }
    return true;
  }),

  check('userType')
  .notEmpty()
  .withMessage("please select a user type")
  .isIn(['guest','host'])
  .withMessage("Invalid user type"),

  check("terms")
  .notEmpty()
  .withMessage('please accept the terms and conditions to proceed')
  .custom((value,{req}) => {
    if(value !== 'on'){
      throw new Error("please accept the terms and conditions")
    }
    return true;
  }),

  
  (req,res,next) => {
  
    const {firstname,lastname,email,password,userType,terms} = req.body;

    const errors = validationResult(req)

    if(!errors.isEmpty()){
      return res.status(422).render('auth/signup', {pageTitle:'Sign Up',isLoggedIn:false,errors:errors.array().map(err => err.msg),oldInput:{firstname,lastname,email,password,userType,terms} })
    }




    bcrypt.hash(password,10).then(hashedPassword => {
      const user = new User({firstname,lastname,email,password:hashedPassword,userType});

      return user.save()

    }).then(() => res.redirect('/login')).catch(err => {
      return res.status(422).render('auth/signup', {pageTitle:'Sign Up',isLoggedIn:false,errors:[err.message],oldInput:{firstname,lastname,email,password,userType,terms} })
    })
   
 
}]