const express = require('express'); //external

  //core

const user = require('./user');

const app = express();

app.use((req,res,next)=>{
  console.log("first middleware");
    next();
});

app.use((req,res,next)=>{
  console.log("second middleware");
  next();
});

app.use((req,res,next)=>{
  console.log("third middleware");
  res.send('<p>success double success</p>');
});



app.listen(2003);