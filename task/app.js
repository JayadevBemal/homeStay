// const express = require("express");
// const app = express();
// const userRouter = require("./routes/userRouter");
// const {hostRouter} = require("./routes/hostRouter"); 
// const rootPath = require('./utils/pathUtil')

// const path = require('path');
// const mongoConnect = require("../task-mongo/utils/databaseUtil");




// app.use(express.static(path.join(rootPath,'public')));

// app.set('view engine','ejs');
// app.set('views','views');

// app.use(express.urlencoded());

// app.use(userRouter);

// app.use("/host",hostRouter);

// app.use((req,res,next)=>{
//  res.render('store/404',{pageTitle: 'Invalid Page'})
// });

// mongoConnect(client => {

//   app.listen(2000);
// })

const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const {hostRouter} = require("./routes/hostRouter"); 
const rootPath = require('./utils/pathUtil')

const path = require('path');
const db = require('./utils/databaseUtil');

db.execute('SELECT * FROM homes')
.then(([a,b]) => {
  console.log(a)
})
.catch(error => {
  console.log('error occured',error)
})

app.use(express.static(path.join(rootPath,'public')));

app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded());

app.use(userRouter);

app.use("/host",hostRouter);

app.use((req,res,next)=>{
 res.render('store/404',{pageTitle: 'Invalid Page'})
});

app.listen(2000);
