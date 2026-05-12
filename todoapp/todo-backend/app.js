const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); // Use Google DNS

const express = require("express");
const app = express();
const rootPath = require("./utils/pathUtil");

const path = require("path");
const { default: mongoose } = require("mongoose");


app.use(express.urlencoded());
app.use(express.static(path.join(rootPath, "public")));


app.use((req, res, next) => {
  res.render("store/404", { pageTitle: "Invalid Page" });
});

mongoose
  .connect(
    "mongodb+srv://rootuser:rootpassword@firsttime.ntfaamf.mongodb.net/todo?appName=firsttime",
  )
  .then(() => {
    console.log("connected");
    app.listen(2000);
  })
  .catch((err) => {
    console.log(err);
  });
