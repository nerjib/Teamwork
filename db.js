/* eslint-disable no-console */
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 */
const createTeamUsers = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        fName VARCHAR(100) NOT NULL,
        lName VARCHAR(100) Null,
        username VARCHAR(100) UNIQUE NOT NULL,
        pWord TEXT NOT NULL,
        email VARCHAR(100) NOT NULL,
        role VARCHAR(100) Null,
        dept VARCHAR(100) NOT NULL,
        address VARCHAR(255) NULL,
        created_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create User Table
 */
const createArticleTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      articles(
        id SERIAL PRIMARY KEY,
        userId VARCHAR(128) NOT NULL,
        title VARCHAR(128) NOT NULL,
        article TEXT NOT NULL,
        createdOn TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createGifTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      gifs(
        id SERIAL PRIMARY KEY,
        userId VARCHAR(128) NOT NULL,
        title VARCHAR(128) NOT NULL,
        gifUrl TEXT NOT NULL,
        createdOn TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const createCommentTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      comments(
        id SERIAL PRIMARY KEY,
        userId VARCHAR(128) NOT NULL,
        comment TEXT NOT NULL,
        articleID TEXT NOT NULL,
        post_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 */
const dropTeamUsers = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 */
const droppostTable = () => {
  const queryText = 'DROP TABLE IF EXISTS posts returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTeamUsers,
  createArticleTable,
  createGifTable,
  dropTeamUsers,
  droppostTable,
  createCommentTable,
};

require('make-runnable');
