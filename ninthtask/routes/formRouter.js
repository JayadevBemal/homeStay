const express = require('express');
const path = require('path');
const rootdir = require('../utils/pathUtils');


const formRouter = express.Router();

formRouter.get("/contact-us",(req,res,next)=>{

 res.sendFile(path.join(rootdir,'pages','form.html'))
});



formRouter.post("/contact-us",(req,res,next)=>{
  console.log(req.body);

  res.sendFile(path.join(rootdir,'pages','final.html'))
})

module.exports = formRouter;