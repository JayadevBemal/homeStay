const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); // Use Google DNS

const express = require("express");
const app = express();
const multer = require('multer');
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const {authRouter} = require('./routes/authRouter')
const rootPath = require("./utils/pathUtil");

const path = require("path");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session') (session);



app.set("view engine", "ejs");
app.set("views", "views");

let store;

app.use(express.urlencoded());
app.use(express.static(path.join(rootPath, "public")));
app.use("/uploads",express.static(path.join(rootPath,'uploads')))

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';

  for(let i = 0;i < length;i++){
    result += characters.charAt(Math.floor(Math.random()* characters.length)) ;
    
  }
  return result;
}
const multerStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,'uploads/');
  },
  filename: (req,file,cb) => {
    cb(null,randomString(10)+'-'+file.originalname)
  }
})

const fileFilter = (req,file,cb) => {

  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null,true);
  }else{
    cb(null,false);
  }
}

 app.use(multer({storage:multerStorage,fileFilter: fileFilter}).single('homeImage'))

app.use(session({
  secret: "abcd",
  resave: false,
  saveUninitialized: true,
  store: new MongoDBStore({
  uri:  "mongodb+srv://rootuser:rootpassword@firsttime.ntfaamf.mongodb.net/airbnb?appName=firsttime",
  collection: 'sessions'
})
}))
app.use((req,res,next) => {
  
  req.isLoggedIn = req.session.isLoggedIn;

    next()
  
})
app.use(userRouter);

app.use("/host", (req,res,next) => {
  if(req.isLoggedIn){
    next()
  }else{
    return res.redirect('/login')
  }
})

app.use("/host", hostRouter);

app.use(authRouter);

app.use((req, res, next) => {
  res.render("store/404", { pageTitle: "Invalid Page" });
});

mongoose
  .connect(
    "mongodb+srv://rootuser:rootpassword@firsttime.ntfaamf.mongodb.net/airbnb?appName=firsttime",
  )
  .then(() => {
    console.log("connected");
    app.listen(2000);
  })
  .catch((err) => {
    console.log(err);
  });
