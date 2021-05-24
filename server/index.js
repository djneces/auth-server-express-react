const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB SETUP
// /auth name of the DB
mongoose.connect('mongodb://localhost:27017/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //collection.ensureIndex is deprecated
  useCreateIndex: true,
});

//APP SETUP
//morgan is middleware, login framework
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//SERVER SETUP
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
