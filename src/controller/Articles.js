/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import moment from 'moment';
// import uuidv4 from 'uuid/v4';
import db from '../db';
// import Helper from './Helper';

// const moment = require('moment');
// const uuidv4 = require('uuid/v4');
// const db = require('../db');

const Articles = {
  // post new articles
  async create(req, res) {
    console.log(req.user.id);
    const createQuery = `INSERT INTO
    articles (userid, title, article, createdon)
    VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [
      req.user.id,
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
  },

  // update/ edit article post
  async updateArticles(req, res) {
    const findOneQuery = 'SELECT * FROM articles WHERE id=$1 AND userid = $2';
    const updateOneQuery = `UPDATE articles
      SET article=$1 WHERE id=$2  AND  userid=$3 RETURNING *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'Article not found' });
      }
      console.log(rows[0].id);
      const values = [
        req.body.article || rows[0].article,
        rows[0].id,
        req.user.id,
      ];
      const { response } = await db.query(updateOneQuery, values);
      const ress = {
        status: 'success',
        data: {
          message: 'article successfully updated',
          title: req.body.title,
          article: req.body.article,
        },
      };
      return res.status(200).send(ress);
    } catch (err) {
      return res.status(400).send('article not updated');
    }
  },

  // Dellete article
  async deleteArticle(req, res) {
    const deleteQuery = 'DELETE FROM articles WHERE id=$1 AND userid = $2 returning *';
    // console.log(req.user.id);
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'Article not found' });
      }
      return res.status(200).send({ message: 'Article successfully deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  // post comment
  async postComments(req, res) {
    console.log(req.body);
    const createQuery = `INSERT INTO comments
            (userid, comment, articleid, post_date)
        VALUES($1, $2, $3, $4)
        returning *`;
    const values = [
      // uuidv4(),
      req.user.id,
      req.body.comment,
      req.params.id,
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const response = {
        status: 'success',
        data: {
          message: 'Comment successfully created',
          createdOn: rows[0].post_date,
          comment: rows[0].comment,
        },
      };
      return res.status(201).send(response);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM articles';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      const data = {
        status: 'success',
      };
      return res.status(200).send(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  // Get single article with comments
  async getOne(req, res) {
    const text = 'SELECT * FROM articles WHERE id = $1';
    // const text = 'SELECT articles.article, comments.comment FROM articles INNER JOIN comments ON
    // article.id=comments.userid';
    const articleComment = 'SELECT * FROM comments WHERE articleid= $1';
    console.log(req.params.id);
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'Article Not found' });
      }
      const { artRows } = await db.query(articleComment, [req.params.id]);
      return res.status(200).send({ messagE: 'success', artRows });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async getComment(req, res) {
    const text = 'SELECT * FROM articles WHERE articleid = $1';
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
  async getMyArticles(req, res) {
    const text1 = 'SELECT * FROM articles CROSS JOIN comments'; // WHERE id = $1';
    const text = 'SELECT * FROM articles WHERE userid = $1';
    console.log(req.user.id);
    try {
      const { rows } = await db.query(text1, [req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'User j not found' });
      }
      console.log(rows[0].username);
      const { rows1 } = await db.query(text, ['me1']);
      return res.status(200).send(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};


export default Articles;
