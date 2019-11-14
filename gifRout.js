const express = require('express');
// IMPORT CONTROLLER
const imageController = require('./src/controllers/gifs');

const upload = require('./multerConfig');

const router = express.Router();
// WHEN A POST IS MADE TO THE ROUTE, IT WILL ENTER THE IMAGE CONTROLLER.
// .any() ACCEPTS ALL FILES THAT COMES OVER THE WIRE.
router.post('/api/v1/gifs', upload.any(), imageController.createApp);
async function create(res, req) {
  res.json('dd');
}
module.exports = router;
module.exports = create;
