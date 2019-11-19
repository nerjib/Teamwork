const express = require('express');
const moment = require('moment');

const router = express.Router();
const db = require('../dbs/index');

router.post('/ha', async (req, res) => {

  console.log(req.user.id);
  const createQuery = `INSERT INTO
      articles (userid, title, article, createdon)
      VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [
    req.body.id,
    req.body.title,
    req.body.article,
    moment(new Date()),
  ];
  try {
    const { rows } = await db.query(createQuery, values);
    // console.log(rows);
    const data = {
      status: 'success',
      data: {
        message: 'Article successfully posted​',
        articleID: rows[0].id,
        createdon: rows[0].createdon,
        title: rows[0].title,
      },
    };
    return res.status(201).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});


module.exports = router;
