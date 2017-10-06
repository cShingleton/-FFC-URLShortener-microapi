const express = require('express');
const jsonParser = require('body-parser').json;
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(jsonParser());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name, {
  useMongoClient: true
});

app.use('/', routes);

app.listen(port, () => console.log('Server listening on port 3000'));