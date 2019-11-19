/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const dotenv = require('dotenv');

const app2 = require('./app2.js');

dotenv.config();

const PORT = process.env.PORT || 3000;

app2.listen(PORT);
console.log(`connected ${PORT}`);

module.exports = {
  app2,
};
