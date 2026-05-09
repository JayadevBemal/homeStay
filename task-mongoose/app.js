const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); // Use Google DNS

const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const {authRouter} = require('./routes/authRouter')
const rootPath = require("./utils/pathUtil");

const path = require("path");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session') (session);

app.use(express.static(path.join(rootPath, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri:  "mongodb+srv://rootuser:rootpassword@firsttime.ntfaamf.mongodb.net/airbnb?appName=firsttime",
  collection: 'sessions'
})

app.use(express.urlencoded());

app.use(session({
  secret: "abcd",
  resave: false,
  saveUninitialized: true,
  store: store
}))
app.use((req,res,next) => {
  console.log(req.session);
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
