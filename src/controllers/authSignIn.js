const express = require('express');

const Helper = require('./helper');

const router = express.Router();
const db = require('../dbs/index');


router.post('/', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Some values are missing' });
  }
  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(401).send({ message: 'Please enter a valid email address' });
  }
  const text = 'SELECT * FROM users WHERE email = $1';
  try {
    const { rows } = await db.query(text, [req.body.email]);
    if (!rows[0]) {
      // console.log('user not');
      return res.status(402).send({ message: 'user not found, check the username' });
    }
    // console.log(rows[0].pword);
    if (!Helper.comparePassword(rows[0].pword, req.body.password)) {
      return res.status(403).send({ message: 'The credentials you provided is incorrect' });
    }
    const token = Helper.generateToken(rows[0].id, rows[0].role);
    const response = {
      status: 'success',
      data: {
        token,
        userId: rows[0].id,
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(405).send(error);
  }
});

module.exports = router;