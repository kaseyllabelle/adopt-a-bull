const express = require('express');
const app = express();
const logInRouter = require('./routes/log-in.router');
const mainRouter = require('./routes/main.router');
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '500kb', extended: true })); 
app.use(bodyParser.urlencoded({ limit: '500kb', extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.use('/log-in', logInRouter);
app.use('/main', mainRouter);

let server;

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