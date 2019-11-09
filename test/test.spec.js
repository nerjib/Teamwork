/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';


// const chaiHttp = require('chai-http');
// const chai = require('chai');
// const app = require('../server');
// const should = chai.should();
afterAll(() => setTimeout(() => process.exit(), 1000));

chai.use(chaiHttp);
chai.should();

const data = {
  fname: 'Najib',
  lname: 'Lere',
  username: 'me3',
  password: '11',
  email: 'nk@gmaisl.com',
  role: 'admin',
  dept: 'IT',
  address: 'KD',
  title: 'I need help on Linting',
  article: 'Errors on new line',
  gifurl: 'gifcom',
  comment: 'im in for this ok.',
};

describe('Users', () => {
  describe('get /', () => {
    it('should get all users', async (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          // res.should.have.status(200);
          res.status.should.be.equal(200);
          // res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('Post /', () => {
    it('trying to  add user that exist', async (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(data)
        .end((err, res) => {
          res.status.should.be.equal(400);
          // res.body.should.be.a('object');
          done();
        });
    });
  });
});
describe('Articles', () => {
  describe('get /', () => {
    it('should get all articles', async (done) => {
      chai.request(app)
        .get('/api/v1/articles')
        .end((err, res) => {
          res.status.should.be.equal(200);
          // res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('Posting articles /', () => {
    it('trying to  add articles ', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .send(data)
        .end((err, res) => {
          res.status.should.be.equal(201);
          // res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('Update /', () => {
    it('updating existing article', async (done) => {
      chai.request(app)
        .put('/api/v1/articles/2')
        .send(data)
        .end((err, res) => {
          res.status.should.be.equal(210);
          // res.should.have.status(200);
          // res.body.should.be.a('object');
          done();
        });
    });
  });
});
