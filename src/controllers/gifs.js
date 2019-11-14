/* eslint-disable func-names */
/* eslint-disable object-shorthand */
// var imageModel = require('./models');
// IMPORT CLOUDINARY CONFIG HERE

// const multer = require('multer');
const cloud = require('../../cloudinaryConfig.js');

// const db = require('../dbs/query');

exports.createApp = (req, res) => {
  try {
    const imageDetails = {
      imageName: req.body.imageName,
      cloudImage: req.files[0].path,
      imageId: '',
    };
    cloud.uploads(imageDetails.cloudImage).then((result) => {
      const imageDetails1 = {
        imageName: req.body.imageName,
        cloudImage: result.url,
        imageId: result.id,
      };
      console.log(imageDetails1);
      res.json({
        created: 'created',
        message: 'image uploaded successfully!!',
      });
    });
  } catch (j) {
    console.log(j);
  }
};
