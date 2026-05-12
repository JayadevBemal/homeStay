const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); // Use Google DNS

const express = require("express");
const app = express();
const cors = require('cors');
// const rootPath = require("./utils/pathUtil");
const errorController = require('./controllers/error');
const todoRouter = require('./routes/todoRouter');

const path = require("path");
const { default: mongoose } = require("mongoose");


app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(rootPath, "public")));

app.use("/api/todo",todoRouter)
app.use(errorController.pageNotFound);

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
