/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */

const { config, uploader } = require('cloudinary');


const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: 'nerjib',
    api_key: '626821658299598',
    api_secret: 'UtFa7ftuWa7aRa1H90Cj1R3abKc',
  });
  next();
};
module.exports = { cloudinaryConfig, uploader };
