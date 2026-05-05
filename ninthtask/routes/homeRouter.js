const path = require('path');
const express = require('express');
const rootdir = require('../utils/pathUtils');
const homeRouter = express.Router();

homeRouter.get('/',(req,res,next)=>{
  
  res.sendFile(path.join(rootdir,'pages','home.html'));
});
module.exports = homeRouter;