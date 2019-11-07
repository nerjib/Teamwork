/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './server';


// const chaiHttp = require('chai-http');
// const chai = require('chai');
// const app = require('../server');

chai.use(chaiHttp);
chai.should();

describe('Users', () => {
  describe('get /', () => {
    it('should get all users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          res.status.should.be.equal(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('Post /', () => {
    const data = {
      username: 'you46',
      name: 'Nerjib',
      password: 'pass',
      email: 'fsh@fbxnsg.com',
    };
    it('trying to  add user that exist', (done) => {
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
    it('should get all articles', (done) => {
      chai.request(app)
        .get('/api/v1/articles')
        .end((err, res) => {
          res.status.should.be.equal(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('Posting articles /', () => {
    const data = {
      username: 'you4',
      article: 'We are starting next sprint next week',
      gifurl: 'https://giffy.com/1',
    };
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
    const data = {
      com_UName: 'me1',
      article: 'comment with your name please',
      comment: 'I like to join you will you let me?',
    };
    it('updating existing article', (done) => {
      chai.request(app)
        .put('/api/v1/articles/1')
        .send(data)
        .end((err, res) => {
          res.status.should.be.equal(200);
          // res.should.have.status(200);
          // res.body.should.be.a('object');
          done();
        });
    });
  });
});
