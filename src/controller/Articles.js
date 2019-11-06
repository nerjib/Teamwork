/* eslint-disable no-console */
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Articles = {
  async create(req, res) {
    console.log(req.body);
    const createQuery = `INSERT INTO articles
      (id, postername, article, gifurl, post_date)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      uuidv4(),
      req.body.username,
      req.body.article,
      req.body.gifurl,
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM articles';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getOne(req, res) {
    const text = 'SELECT * FROM articles WHERE articleID = $1';
    console.log(req.params.id);
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async getComment(req, res) {
    const text = 'SELECT * FROM articles WHERE articleID = $1';
    console.log(req.params.id);
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async postComments(req, res) {
    console.log(req.body);
    const createQuery = `INSERT INTO comments
            (comentorName, comment, articleID, post_date)
        VALUES($1, $2, $3, $4)
        returning *`;
    const values = [
      // uuidv4(),
      req.body.com_UName,
      req.body.comment,
      req.body.articleID,
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getOneComments(req, res) {
    const text = 'SELECT * FROM comments WHERE articleid = $1';
    console.log(req.params.id);
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },


  // update post
  async updateArticles(req, res) {
    const findOneQuery = 'SELECT * FROM articles WHERE articleID=$1 AND postername = $2';
    const updateOneQuery = `UPDATE articles
      SET article=$1 WHERE articleid=$2 AND  postername=$3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.body.com_UName]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'Article not found' });
      }
      console.log(req.body.com_UName);
      const values = [
        req.body.article || rows[0].article,
        req.params.id || rows[0].articleid,
        req.body.com_UName,
      ];
      const response = await db.query(updateOneQuery, values);
      const ress = {
        status: 'success',
        data: {
          article: response.rows[0].article,
          atid: response.rows[0].articleid,
        },
      };
      return res.status(200).send(ress);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  // Dellete article
  async deleteArticle(req, res) {
    const deleteQuery = 'DELETE FROM articles WHERE articleID=$1 AND postername = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'user not found' });
      }
      return res.status(204).send({ message: 'deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default Articles;
