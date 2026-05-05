const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const rootdir = require('./utils/pathUtils');

const homeRouter = require('./routes/homeRouter');
const formRouter = require('./routes/formRouter');

const app = express();


app.use(express.urlencoded());


app.use(homeRouter);
app.use(formRouter);

app.use((req,res,next)=>{
  res.sendFile(path.join(rootdir,'pages','error.html'))
})



app.listen(2000);