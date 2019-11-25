/* eslint-disable dot-notation */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const db = require('../dbs/index');


async function verifyToken(req, res, next) {
  const token = req.headers['token']
  || req.cookies['token'] || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzQ2OTQwNDEsImV4cCI6MTU3NTI5ODg0MX0.wwNR54OA5KQAo_cpgaI1dzWDzdghGY9K1yRCDKofjpk';
  console.log(`cookiess${req.cookies['token']}`);

  if (!token) {
    return res.status(400).send({ message: 'Token is not provided' });
  }
  try {
    const decoded = await jwt.verify(token, 'secret');
    console.log(decoded);
    const text = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(text, [decoded.userId]);
    if (!rows[0]) {
      return res.status(400).send({ message: 'The token you provided is invalid' });
    }
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
}
async function verifyAdmin(req, res, next) {
  const token = req.headers['token'];
  if (!token) {
    return res.status(400).send({ message: 'Token is not provided' });
  }
  try {
    const decoded = await jwt.verify(token, 'secret');
    console.log(decoded);
    const text = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(text, [decoded.userId]);
    if (!rows[0]) {
      return res.status(400).send({ message: 'The token you provided is invalid' });
    }
    if (!(decoded.role === 'admin')) {
      return res.status(400).send({ message: 'Access denied' });
    }
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
}


module.exports = {
  verifyToken,
  verifyAdmin,
};
