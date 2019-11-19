/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-arrow-callback */
const express = require('express');
const bodyParser = require('body-parser');

const cloudinary = require('cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');
const Users = require('./src/controllers/users');
const authUsers = require('./src/controllers/authUsers');
const Articles = require('./src/controllers/Articles');
const Gifs = require('./src/controllers/gifs');
const authUsersSignIn = require('./src/controllers/authSignIn');
const Feeds = require('./src/controllers/feeds');


const Auth = require('./src/middlewares/auth');


const app = express();

dotenv.config();

// HANDLING CORS ERRORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.get('/', (req, res) => {
  res.send('wellcome');
});


const storage = multer.diskStorage({
  distination: function (req, file, cb) {
    cb(null, './src');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
cloudinary.config({
  cloud_name: 'nerjib',
  api_key: '626821658299598',
  api_secret: 'UtFa7ftuWa7aRa1H90Cj1R3abKc',
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


app.use(bodyParser.json());
app.use('/api/v1/users', Users);
app.use('/api/v1/auth/create-user', authUsers);
app.use('/api/v1/auth/signin', authUsersSignIn);
app.use('/api/v1/articles', Articles);
app.post('/api/v1/gifs/:id/comments', async (req, res) => {
  Gifs.postGifComment(req, res);
});
app.get('/api/v1/gifs', async (req, res) => {
  Gifs.getGif(req, res);
});
app.get('/api/v1/gifs/:id', async (req, res) => {
  Gifs.getOne(req, res);
});
app.delete('/api/v1/gifs/:id', async (req, res) => {
  Gifs.deleteGif(req, res);
});

app.post('/api/v1/gifs', upload.single('image'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, function (result) {
    // console.log(req.file);
    Gifs.createGif(req, res, result.secure_url);
  });
});

app.get('/api/v1/feeds', async (req, res) => {
  Feeds.getAll(req, res);
});

module.exports = app;
