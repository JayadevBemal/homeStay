const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); // Use Google DNS

const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootPath = require("./utils/pathUtil");

const path = require("path");
const { default: mongoose } = require("mongoose");

app.use(express.static(path.join(rootPath, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());

app.use(userRouter);

app.use("/host", hostRouter);

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
