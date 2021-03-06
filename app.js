/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-arrow-callback */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');
const cloudinary = require('cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');
const db = require('./src/dbs/index');
const Helper = require('./src/controllers/helper');
const Users = require('./src/controllers/users');
const authUsers = require('./src/controllers/authUsers');
const Articles = require('./src/controllers/Articles');
const Gifs = require('./src/controllers/gifs');
 const authUsersSignIn = require('./src/controllers/authSignIn');
const Feeds = require('./src/controllers/feeds');

const Auth = require('./src/middlewares/auth');


const app = express();
app.use(cors());

http.createServer(app);
dotenv.config();

// HANDLING CORS ERRORS
/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


const storage = multer.diskStorage({
  distination: function (req, file, cb) {
    cb(null, './src');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(new Error('image is not gif'), false);
  }
};
const upload = multer({
  storage,
  fileFilter,
});

// app.use('/api/v1/articles', Articles);
app.post('/api/v1/articles', Auth.verifyToken, async (req, res) => {
  Articles.postArticle(req, res);
});
app.get('/api/v1/articles', Auth.verifyToken, async (req, res) => {
  Articles.getAll(req, res);
});
app.get('/api/v1/articles/:id', Auth.verifyToken, async (req, res) => {
  Articles.getOne(req, res);
});
app.post('/api/v1/articles/:id/comment', Auth.verifyToken, async (req, res) => {
  Articles.postComment(req, res);
});
app.put('/api/v1/articles/:id', Auth.verifyToken, async (req, res) => {
  Articles.updateArticle(req, res);
});
app.delete('/api/v1/articles/:id', Auth.verifyToken, async (req, res) => {
  Articles.deleteArticle(req, res);
});
app.use('/api/v1/users', Auth.verifyToken, Users);
app.use('/api/v1/auth/create-user', Auth.verifyAdmin, authUsers);
app.use('/api/v1/auth/signin', authUsersSignIn);

app.post('/api/v1/gifs/:id/comment', Auth.verifyToken, async (req, res) => {
  Gifs.postGifComment(req, res);
});
app.get('/api/v1/gifs', Auth.verifyToken, async (req, res) => {
  Gifs.getGif(req, res);
});
app.get('/api/v1/gifs/:id', Auth.verifyToken, async (req, res) => {
  Gifs.getOne(req, res);
});
app.delete('/api/v1/gifs/:id', Auth.verifyToken, async (req, res) => {
  Gifs.deleteGif(req, res);
});
app.get('/', (req, res) => {
  res.json({
    wellcome: 'ggg',
    dd: 'ggfd',
  });
});

app.post('/api/v1/gifs', upload.single('image'), Auth.verifyToken, (req, res) => {
  cloudinary.uploader.upload(req.file.path, function (result) {
    // console.log(req.file);
    Gifs.createGif(req, res, result.secure_url);
  });
});

app.get('/api/v1/checktoken', Auth.verifyToken, (req, res) => {
  res.status(200).send({
    status: 'ok',
  });
});
app.get('/api/v1/checkrole', Auth.verifyAdmin, (req, res) => {
  res.status(200).send({status: 'ok'});
});
app.get('/api/v1/feeds', Auth.verifyToken, async (req, res) => {
  Feeds.getAll(req, res);
});


module.exports = app;
