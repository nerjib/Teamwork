/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
// server.js
import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import Articles from './src/controller/Articles';
import Users from './src/controller/Users';
import Auth from './src/middleware/Auth';

// const express = require('express');
// const dotenv = require('dotenv');
// const Articles = require('./src/controller/Articles');
// const Users = require('./src/controller/Users');
// const Auth = require('./src/middleware/Auth');

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send({ message: 'YAY! Endpoint is working' });
});
app.get('/api/v1/articles/me', Auth.verifyToken, Articles.getMyArticles);
app.post('/api/v1/articles', Auth.verifyToken, Articles.create);
app.get('/api/v1/articles', Auth.verifyToken, Articles.getAll);
app.get('/api/v1/articles/:id', Auth.verifyToken, Articles.getOne);
app.post('/api/v1/articles/:id/comments', Auth.verifyToken, Articles.postComments);
app.delete('/api/v1/articles/:id', Auth.verifyToken, Articles.deleteArticle);
app.get('/api/v1/articles/:id/comments/', Auth.verifyToken, Articles.getOneComments);
app.put('/api/v1/articles/:id', Auth.verifyToken, Articles.updateArticles);
app.post('/api/v1/auth/create-user', Auth.verifyToken, Users.create);
app.post('/api/v1/auth/signin', Users.login);
app.post('/api/v1/users', Users.create);
app.get('/api/v1/users', Users.getAll);
app.delete('/api/v1/users/me', Auth.verifyToken, Users.deleteUser);

app.listen(3000);
console.log('app running on port ', 3000);
// module.exports = {
//  app,
// };
export default app;
