const express = require('express');
const app = express();
const mongoose = require('mongoose');
const landingRouter = require('./routes/landing.router');
const userRouter = require('./routes/user.router');
const mainRouter = require('./routes/main.router');
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '500kb', extended: true })); 
app.use(bodyParser.urlencoded({ limit: '500kb', extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/user', userRouter);
app.use('/main', mainRouter);
app.use('/', landingRouter);

let server;

mongoose.connect('mongodb://kaseyllabelle:CHAI912fall@ds225078.mlab.com:25078/adopt-a-bull', (error) =>
{
  if(error)
  {
    console.error('Please make sure Mongodb is installed and running!', error); 
    throw error;
  }
  console.log('Mongo running at');
});

function runServer(){
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer(){
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err){
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module){
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};