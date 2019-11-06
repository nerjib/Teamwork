/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
// server.js
import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import Articles from './src/controller/Articles';
import Users from './src/controller/Users';
import Auth from './src/middleware/Auth';

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send({ message: 'YAY! Endpoint is working' });
});

app.post('/api/v1/articles', Articles.create);
app.get('/api/v1/articles', Articles.getAll);
app.get('/api/v1/articles/:id', Articles.getOne);
app.post('/api/v1/articles/:id/', Articles.postComments);
app.get('/api/v1/articles/:id/comments/', Articles.getOneComments);
app.put('/api/v1/articles/:id', Articles.updateArticles);
// app.get('/api/v1/users/:id', Auth.verifyToken, Posts.getOne);
// app.get('/api/v1/article/:id',  PostArticle.getOne);
// app.put('/api/v1/reflections/:id', Auth.verifyToken, PostArticle.update);
// app.delete('/api/v1/reflections/:id', Auth.verifyToken, PostArticle.delete);
app.post('/api/v1/users', Users.create);
app.get('/api/v1/users', Users.getAll);
// app.get('/api/v1/users/:id',  users.getOne);
// app.post('/api/v1/users/login', Users.login);
app.delete('/api/v1/users/me', Auth.verifyToken, Users.deleteUser);

app.listen(3000);
console.log('app running on port ', 3000);
export default app;
