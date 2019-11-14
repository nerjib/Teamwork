/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: true,
});

pool.connect();

const query = (text, params) => {
  return new Promise((resolve, reject) => {
    pool.query(text, params)
      .then((res) => {
      //  console.log(res);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  query,
  pool,
};
