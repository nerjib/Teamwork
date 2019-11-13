/* eslint-disable no-console */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const db = require('../dbs/query');


async function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
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

module.exports = {
  verifyToken,
};
