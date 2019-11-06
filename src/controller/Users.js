/* eslint-disable no-console */
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import Helper from './Helper';

const User = {
  // create new user account
  async create(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO
      users (id, name, username, pword, email, role, created_date)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      uuidv4(),
      req.body.name,
      req.body.username,
      hashPassword,
      req.body.email,
      req.body.role,
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({ token });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(error);
    }
  },
  // view all Team members
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM users';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  // view single member
  async getOne(req, res) {
    const text = 'SELECT * FROM users WHERE username = $1';
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

  // delete user
  async deleteUser(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE username=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'user not found' });
      }
      return res.status(204).send({ message: 'deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default User;
