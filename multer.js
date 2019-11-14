/* eslint-disable import/prefer-default-export */
const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
const dUri = new Datauri();

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
console.log(dataUri);
module.exports = { multerUploads, dataUri };
