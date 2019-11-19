const express = require('express');
const bodyParser = require('body-parser');

const Users = require('./src/controllers/Users1');


const app2 = express();

app2.use(bodyParser.json());
app2.use('/api/v1/', Users);

app2.get('/', (req, res) => {
  return res.json('welcome');
});

module.exports = app2;
