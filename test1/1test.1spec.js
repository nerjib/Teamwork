/* eslint-disable quotes */
/* eslint-disable arrow-parens */
/* eslint-disable no-undef */

// import app from '../server';

/*
##################
const chaiHttp = require('chai-http');
const chai = require('chai');
const { app } = require('../server');
const db = require('./src');
// const should = chai.should();
// afterAll(() => setTimeout(() => process.exit(), 1000));

chai.use(chaiHttp);
chai.should();
/*
beforeAll(async () => {
  await db.query('CREATE TABLE students (id SERIAL PRIMARY KEY, name TEXT)');
});

beforeEach(async () => {
  // seed with some data
  await db.query('INSERT INTO students (name) VALUES ("Elie"), ("Matt")');
});

afterEach(async () => {
  //  await db.query('DELETE FROM students');
});

afterAll(async () => {
  // await db.query('DROP TABLE students');
  db.pool.end();
});
// Configure chai
*/
/*
##########
const data1 = {
  fname: 'Najib',
  lname: 'Lere',
  username: 'meddds1',
  password: '11',
  email: 'medddssd@me.com',
  role: '',
  dept: 'IT',
  address: 'KD',
  title: 'I need help on Linting',
  article: 'Errors on new line',
  gifurl: 'gifcom',
  comment: 'im in for this ok.',
};
const data = {
  fname: 'Najib',
  lname: 'Lere',
  username: 'me1',
  password: '11',
  email: 'nk@gmail.com',
  role: '',
  dept: 'IT',
  address: 'KD',
  title: 'I need help on Linting',
  article: 'Errors on new line',
  gifurl: 'gifcom',
  comment: 'im in for this ok.',
};
chai.use(chaiHttp);
chai.should();
let auth = {};
/*
describe('Sign /', () => {
  it('sign users', async (done) => {
    const text1 = `CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      fName VARCHAR(100) NOT NULL,
      lName VARCHAR(100) Null,
      username VARCHAR(100) NOT NULL,
      pWord TEXT NOT NULL,
      email VARCHAR(100) NOT NULL,
      role VARCHAR(100) Null,
      dept VARCHAR(100) NOT NULL,
      address VARCHAR(255) NULL,
      created_date TIMESTAMP
    )`;
    // await db.query(text1);
    const text = `INSERT INTO users(fname, username, pword, email, dept) VALUES($1,$2,$3,$4,$5)`;
    await db.query(text, ['test', 'me1', '11', 'nk@gmail.com', 'it']);
    done();
  });
});
*/
/*
#############
describe('Sign /', () => {
  it('sign users', async (done) => {
    const ff = {
      username: 'me1',
      password: '11',
      email: 'nk@gmail.com',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data)
      .end((err, res) => {
        // console.log(res.body);
        res.status.should.be.equal(200);
        done();
      });
  });
});
/*
describe('Sign /', () => {
  it('sign users', async (done) => {
    await db.query(`drop table users`);
    chai.request(app)
      .end((err, res) => {
        res.status.should.be.equal(200);
        done();
      });
  });
});
*/
